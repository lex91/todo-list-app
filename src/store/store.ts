import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middlewares = [thunk];

// TODO: remove logger from production
if (process.env.NODE_ENV === `development` || true) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  blacklist: ['network'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
