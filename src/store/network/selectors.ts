import { IRootState } from '../types';

export const selectIsOnline = (state: IRootState): boolean => state.network.isOnline;
