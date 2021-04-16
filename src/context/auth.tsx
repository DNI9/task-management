import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type AuthActionTypes =
  | 'LOGIN'
  | 'REGISTER'
  | 'LOGOUT'
  | 'SET_LOADING'
  | 'SET_USER';

type Action = {
  type: AuthActionTypes;
  payload?: any;
};

type User = { id: number; username: string };

type Dispatch = (action: Action) => void;

type State = {
  isAuthenticated: boolean;
  loading: boolean;
  me: User | null;
  userLoading: boolean;
};

type AuthProviderProps = { children: React.ReactNode };

type ContextType = {
  state: State;
  dispatch: Dispatch;
  getLoggedInUser: () => Promise<void>;
};

const AuthStateContext = createContext<ContextType | undefined>(undefined);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    }

    case 'SET_USER': {
      return {
        ...state,
        userLoading: false,
        isAuthenticated: true,
        me: payload,
      };
    }

    case 'REGISTER': {
      return {
        ...state,
        loading: false,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    }

    case 'SET_LOADING': {
      return { ...state, loading: !state.loading };
    }

    default:
      throw new Error(`Unknown action type ${type}`);
  }
};

type FormData = {
  username: string;
  password: string;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    loading: false,
    me: null,
    userLoading: true,
  });

  async function getLoggedInUser() {
    try {
      const { data } = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      });
      dispatch({ type: 'SET_USER', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_USER', payload: null });
    }
  }

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const value = { state, dispatch, getLoggedInUser };
  return (
    <AuthStateContext.Provider value={value}>
      {!state.userLoading && children}
    </AuthStateContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
