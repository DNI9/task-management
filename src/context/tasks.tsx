import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { TaskType } from '../types';

axios.interceptors.request.use((config) => {
  if (config.url?.includes('/tasks')) {
    config.headers.Authorization = `Bearer ${localStorage.accessToken}`;
  }
  return config;
});

export type TaskActionTypes =
  | 'CREATE_TASK'
  | 'UPDATE_TASK'
  | 'DELETE_TASK'
  | 'GET_TASKS'
  | 'SET_SEARCH_RESULTS'
  | 'REMOVE_SEARCH_RESULTS'
  | 'SET_ERROR'
  | 'CLEAR_ERROR';

type Action = {
  type: TaskActionTypes;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type State = {
  tasks: TaskType[];
  loading: boolean;
  errors: [string] | null;
  searchResults: TaskType[] | null;
};

type TaskProviderProps = { children: React.ReactNode };

type ContextType = {
  state: State;
  dispatch: Dispatch;
  addErrorToState: (errors: string[]) => void;
  getTasks: () => Promise<void>;
  searchTasks: (data: { search: string; status: string }) => Promise<void>;
};

const TaskStateContext = createContext<ContextType | undefined>(undefined);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'GET_TASKS': {
      return { ...state, loading: false, tasks: payload };
    }
    case 'SET_SEARCH_RESULTS': {
      return { ...state, loading: false, searchResults: payload };
    }
    case 'REMOVE_SEARCH_RESULTS': {
      return { ...state, loading: false, searchResults: null };
    }

    default:
      throw new Error(`Unknown action type ${type}`);
  }
};

function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
    loading: true,
    errors: null,
    searchResults: null,
  });

  // Actions
  function addErrorToState(errors: string[]) {}

  async function getTasks() {
    try {
      const { data } = await axios.get<TaskType[]>('/tasks');
      dispatch({ type: 'GET_TASKS', payload: data });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function searchTasks({
    search,
    status,
  }: {
    search: string;
    status: string;
  }) {
    try {
      const { data } = await axios.get<TaskType[]>(
        `/tasks?search=${search}${status && `&status=${status}`}`
      );
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: data });
    } catch (err) {
      // TODO: add error to state
      dispatch({ type: 'REMOVE_SEARCH_RESULTS' });
    }
  }

  const value = { state, dispatch, addErrorToState, getTasks, searchTasks };
  return (
    <TaskStateContext.Provider value={value}>
      {children}
    </TaskStateContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskStateContext);

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return context;
}

export { TaskProvider, useTask };
