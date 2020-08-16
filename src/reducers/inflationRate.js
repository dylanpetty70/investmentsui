import {UPDATE_INFLATION_RATE} from '../actions/inflationRate';

export default function inflationRate(state = 0, action) {
	switch (action.type) {
		case UPDATE_INFLATION_RATE:
			return action.inflationRate;
		default:
			return state;
	}
}