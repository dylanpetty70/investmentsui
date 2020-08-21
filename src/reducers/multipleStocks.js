export const STOCK_CANDLE = 'STOCK_CANDLE';

export default function multipleStocks(state = {}, action) {
	switch (action.type) {
		case STOCK_CANDLE:
			let key = action.stock;
			return {...state, [key]: action.stockCandle};
		default:
			return state;
	}
}