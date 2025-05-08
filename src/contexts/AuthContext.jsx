//contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext } from 'react';
import * as authService from '../services/authService';

// Initial state
const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Actions
const ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
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
      return { ...state, currentUser: null, status: 'idle', error: null };
    default:
      return state;
  }
}

// Context
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async ({ email, password }) => {
    dispatch({ type: ACTIONS.LOGIN_START });
    try {
      await authService.login({ email, password });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to load user');
      const user = await res.json();


      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });

    } catch (err) {
      dispatch({ type: ACTIONS.LOGIN_ERROR, payload: err.message });
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('user');
    dispatch({ type: ACTIONS.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        status: state.status,
        error: state.error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
