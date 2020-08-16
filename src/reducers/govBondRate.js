import {UPDATE_GOV_BOND_RATE} from '../actions/govBondRate';

export default function govBondRate(state = 0, action) {
	switch (action.type) {
		case UPDATE_GOV_BOND_RATE:
			return action.govBondRate;
		default:
			return state;
	}
}