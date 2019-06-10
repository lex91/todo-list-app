import { applyMiddleware, createStore } from 'redux';

import reducer from './reducer';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

export default createStore(reducer, applyMiddleware(...middlewares));
