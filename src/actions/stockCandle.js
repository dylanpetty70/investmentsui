import * as api from '../API';
export const STOCK_CANDLE = 'STOCK_CANDLE';

function updateStockCandle(stock, stockCandle) {
	return {
		type: STOCK_CANDLE,
		stockCandle,
		stock
	};
}

export function handleUpdateStockCandle(stock) {
	return async (dispatch) => {
		await api.genStockCandle(stock)
			.then((data) => {
				dispatch(updateStockCandle(stock, data));
			});
	}
}