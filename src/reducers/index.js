import { combineReducers } from 'redux';

import govBondRate from './govBondRate';
import inflationRate from './inflationRate';
import SPYCandle from './SPYCandle';
import stockCandle from './stockCandle';
import stockFinancials from './stockFinancials';
import stockProfile from './stockProfile';
import jacobVal from './jacobVal';

export default combineReducers({
	govBondRate,
	inflationRate,
	SPYCandle,
	stockCandle,
	stockFinancials,
	stockProfile,
	jacobVal
})