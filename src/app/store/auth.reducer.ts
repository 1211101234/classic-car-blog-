import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import { loginSuccess, loginFailure, logout } from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error
  })),
  on(logout, () => initialState)
);
// src/app/store/auth.reducer.ts
