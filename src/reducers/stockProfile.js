import {STOCK_PROFILE} from '../actions/stockProfile';

export default function StockProfile(state = [], action) {
	switch (action.type) {
		case STOCK_PROFILE:
			return action.stockProfile;
		default:
			return state;
	}
}