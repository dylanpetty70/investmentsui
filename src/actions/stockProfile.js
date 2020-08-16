import * as api from '../API';
export const STOCK_PROFILE = 'STOCK_PROFILE';

function updateStockProfile(stockProfile) {
	return {
		type: STOCK_PROFILE,
		stockProfile
	};
}

export function handleUpdateStockProfile(stock) {
	return async (dispatch) => {
		await api.genStockProfile(stock)
			.then((data) => {
				dispatch(updateStockProfile(data));
			});
	}
}