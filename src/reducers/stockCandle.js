import {STOCK_CANDLE} from '../actions/stockCandle';

export default function StockCandle(state = [], action) {
	switch (action.type) {
		case STOCK_CANDLE:
			return action.stockCandle;
		default:
			return state;
	}
}