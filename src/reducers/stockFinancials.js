import {STOCK_FINANCIALS} from '../actions/stockFinancials';

export default function StockFinancials(state = [], action) {
	switch (action.type) {
		case STOCK_FINANCIALS:
			return action.stockFinancials;
		default:
			return state;
	}
}