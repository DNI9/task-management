import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type AuthActionTypes = 'LOGIN' | 'REGISTER' | 'LOGOUT' | 'SET_LOADING';
type Action = {
  type: AuthActionTypes;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type State = {
  isAuthenticated: boolean;
  loading: boolean;
};

type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const reducer = (state: State, { type }: Action) => {
  switch (type) {
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
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
      return {
        ...state,
        loading: !state.loading,
      };
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
  });

  useEffect(() => {
    // check if user is logged in on app mount
  }, []);

  const value = { state, dispatch };
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
