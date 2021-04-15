import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { TaskType } from '../types';

axios.interceptors.request.use((config) => {
  if (config.url === '/tasks') {
    config.headers.Authorization = `Bearer ${localStorage.accessToken}`;
  }
  return config;
});

export type TaskActionTypes =
  | 'CREATE_TASK'
  | 'UPDATE_TASK'
  | 'DELETE_TASK'
  | 'GET_TASKS'
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
  errors: null;
};

type TaskProviderProps = { children: React.ReactNode };

type ContextType = {
  state: State;
  dispatch: Dispatch;
  addErrorToState: (errors: string[]) => void;
  getTasks: () => Promise<void>;
};

const TaskStateContext = createContext<ContextType | undefined>(undefined);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'GET_TASKS': {
      return {
        ...state,
        loading: false,
        tasks: payload,
      };
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

  const value = { state, dispatch, addErrorToState, getTasks };
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
