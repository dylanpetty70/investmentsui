import {applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

import logger from './logger';

export default applyMiddleware(thunk, promiseMiddleware, logger);