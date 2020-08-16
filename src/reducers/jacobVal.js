import {UPDATE_DCF} from '../actions/jacobVal';
import {UPDATE_WACC} from '../actions/jacobVal';
import {UPDATE_BETA} from '../actions/jacobVal';
import {UPDATE_CREDIT_RISK_RATE} from '../actions/jacobVal';
import {UPDATE_DISCOUNT_RATE} from '../actions/jacobVal';
import {UPDATE_MARKET_RETURN} from '../actions/jacobVal';
import {UPDATE_REALITY} from '../actions/jacobVal';
import {UPDATE_STOCK} from '../actions/jacobVal';
import {UPDATE_TAX_RATE} from '../actions/jacobVal';
import {UPDATE_VALUATION} from '../actions/jacobVal';

export default function jacobVal(state = {
	DCF: 0,
	WACC: 0,
	beta: 0,
	creditRiskRate: 0,
	discountRate: 0,
	marketReturn: 0,
	reality: 0,
	stock: "",
	taxRate: 0.22,
	valuation: 0
}, action) {
	switch (action.type) {
		case UPDATE_DCF:
			return {...state, DCF: action.DCF};
		case UPDATE_WACC:
			return {...state, WACC: action.WACC};
		case UPDATE_BETA:
			return {...state, beta: action.beta};
		case UPDATE_CREDIT_RISK_RATE:
			return {...state, creditRiskRate: action.creditRiskRate};
		case UPDATE_DISCOUNT_RATE:
			return {...state, discountRate: action.discountRate};
		case UPDATE_MARKET_RETURN:
			return {...state, marketReturn: action.marketReturn};
		case UPDATE_REALITY:
			return {...state, reality: action.reality};
		case UPDATE_STOCK:
			return {...state, stock: action.stock};
		case UPDATE_TAX_RATE:
			return {...state, taxRate: action.taxRate};
		case UPDATE_VALUATION:
			return {...state, valuation: action.valuation};
		default:
			return state;
	}
}