import * as api from '../API';
export const UPDATE_GOV_BOND_RATE = 'UPDATE_GOV_BOND_RATE';

function updateGovBondRate(govBondRate) {
	return {
		type: UPDATE_GOV_BOND_RATE,
		govBondRate
	};
}

export function handleUpdateGovBondRate() {
	return async (dispatch) => {
		await api.genGovBondRate()
			.then((data) => {
				dispatch(updateGovBondRate(data));
			});
	}
}