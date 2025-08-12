import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectIsAuthenticated = createSelector(selectAuthState, state => state.isAuthenticated);
export const selectAuthError = createSelector(selectAuthState, state => state.error);
export const selectUserRole = createSelector(selectUser, user => user?.role);
