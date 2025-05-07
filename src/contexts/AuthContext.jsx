import React, { createContext, useReducer, useContext } from 'react';
import authService from '../services/authService';

// Initial state
const initialState = {
  currentUser: null,
  status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Actions
const ACTIONS = {
  LOGIN_START:   'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR:   'LOGIN_ERROR',
  LOGOUT:        'LOGOUT',
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_START:
      return { ...state, status: 'loading', error: null };
    case ACTIONS.LOGIN_SUCCESS:
      return { ...state, status: 'succeeded', currentUser: action.payload };
    case ACTIONS.LOGIN_ERROR:
      return { ...state, status: 'failed', error: action.payload };
    case ACTIONS.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}

// Context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    dispatch({ type: ACTIONS.LOGIN_START });
    try {
      const user = await authService.login(credentials);
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
    } catch (err) {
      dispatch({ type: ACTIONS.LOGIN_ERROR, payload: err.message });
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: ACTIONS.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
