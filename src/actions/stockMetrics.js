import * as api from '../API';
export const STOCK_METRICS = 'STOCK_METRICS';

function updateStockMetrics(stockMetrics) {
	return {
		type: STOCK_METRICS,
		stockMetrics
	};
}

export function handleUpdateStockMetrics(stock) {
	return async (dispatch) => {
		await api.genStockMetrics(stock)
			.then((data) => {
				dispatch(updateStockMetrics(data));
			});
	}
}