import { createStandardAction } from 'typesafe-actions';

export const setIsAuthenticated = createStandardAction('@todo/auth/setIsAuthenticated')<boolean>();
