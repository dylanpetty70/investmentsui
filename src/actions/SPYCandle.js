import * as api from '../API';
export const SPY_CANDLE = 'SPY_CANDLE';

function updateSPYCandle(SPYCandle) {
	return {
		type: SPY_CANDLE,
		SPYCandle
	};
}

export function handleUpdateSPYCandle() {
	return async (dispatch) => {
		await api.genSPYCandle()
			.then((data) => {
				dispatch(updateSPYCandle(data));
			});
	}
}