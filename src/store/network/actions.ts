import { createStandardAction } from 'typesafe-actions';

export const setOnline = createStandardAction('@todo/network/setOnline')<boolean>();

export const registerNetworkFail = createStandardAction('@todo/network/registerNetworkFail')<
  void
>();

export const registerNetworkSuccess = createStandardAction('@todo/network/registerNetworkSuccess')<
  void
>();
