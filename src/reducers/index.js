import { combineReducers } from 'redux';

import govBondRate from './govBondRate';
import inflationRate from './inflationRate';
import SPYCandle from './SPYCandle';
import stockCandle from './stockCandle';
import stockFinancials from './stockFinancials';
import stockProfile from './stockProfile';
import jacobVal from './jacobVal';
import user from './user';
import userStatus from './userStatus';
import multipleStocks from './multipleStocks';
import dndInfo from './dndInfo';
import draggable from './draggable';
import envOptions from './envOptions';

export default combineReducers({
	govBondRate,
	inflationRate,
	SPYCandle,
	stockCandle,
	stockFinancials,
	stockProfile,
	jacobVal,
	user,
	userStatus,
	multipleStocks,
	dndInfo,
	draggable,
	envOptions
})