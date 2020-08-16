import * as api from '../API';
export const STOCK_FINANCIALS = 'STOCK_FINANCIALS';

function updateStockFinancials(stockFinancials) {
	return {
		type: STOCK_FINANCIALS,
		stockFinancials
	};
}

export function handleUpdateStockFinancials(stock) {
	return async (dispatch) => {
		await api.genStockFinancials(stock)
			.then((data) => {
				dispatch(updateStockFinancials(data));
			});
	}
}