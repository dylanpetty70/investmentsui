import {STOCK_METRICS} from '../actions/stockMetrics';

export default function StockMetrics(state = [], action) {
	switch (action.type) {
		case STOCK_METRICS:
			return action.stockMetrics;
		default:
			return state;
	}
}