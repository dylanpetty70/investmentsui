import {SPY_CANDLE} from '../actions/SPYCandle';

export default function SPYCandle(state = [], action) {
	switch (action.type) {
		case SPY_CANDLE:
			return action.SPYCandle;
		default:
			return state;
	}
}