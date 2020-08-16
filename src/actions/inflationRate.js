import * as api from '../API';
export const UPDATE_INFLATION_RATE = 'UPDATE_INFLATION_RATE';

function updateInflationRate(inflationRate) {
	return {
		type: UPDATE_INFLATION_RATE,
		inflationRate
	};
}

export function handleUpdateInflationRate() {
	return async (dispatch) => {
		await api.genInflationRate()
			.then((data) => {
				dispatch(updateInflationRate(data));
			});
	}
}