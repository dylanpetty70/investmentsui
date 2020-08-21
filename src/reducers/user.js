import {CHECK_PASSWORD} from '../actions/user';
import {NEW_USER} from '../actions/user';
import {NEW_STOCK} from '../actions/userStocks';
import {DELETE_STOCK} from '../actions/userStocks';

export default function user(state = {}, action) {
	switch (action.type) {
		case CHECK_PASSWORD:
			if(action.check){
				return action.userInfo;
			} else {
				return {};
			}
		case NEW_USER:
			if(action.status === 200){
				return {firstName: action.firstName, lastName: action.lastName, username: action.username, userStocks: {}}
			} else {
				return state;
			}
		case NEW_STOCK:
		case DELETE_STOCK:
			return {...state, userStocks: action.result};
		default:
			return state;
	}
}