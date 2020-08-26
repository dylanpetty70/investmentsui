import {GRAB_OPTIONS} from '../actions/draggable';
import {CHANGE_CURRENT_ENV} from '../actions/draggable';


export default function draggableOptions(state = {all: ['first'], current: 'first'}, action) {
	switch (action.type) {
		case GRAB_OPTIONS:
			state.all = action.data;
			return state;
		case CHANGE_CURRENT_ENV:
			state.current = action.data;
			return state;
		default:
			return state;
	}
}