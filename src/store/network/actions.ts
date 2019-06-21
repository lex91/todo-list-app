import { ActionType, createStandardAction } from 'typesafe-actions';

const setOnline = createStandardAction('@todo/network/setOnline')<boolean>();

const registerNetworkFail = createStandardAction('@todo/network/registerNetworkFail')<void>();

const registerNetworkSuccess = createStandardAction('@todo/network/registerNetworkSuccess')<void>();

export const actions = { setOnline, registerNetworkFail, registerNetworkSuccess };

export type IActionType = ActionType<typeof actions>;
