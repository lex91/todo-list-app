import { IRootState } from '../types';

export const selectIsAuthenticated = (state: IRootState): boolean => state.auth.isAuthenticated;
