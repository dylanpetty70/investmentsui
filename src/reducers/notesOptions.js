import {
CHANGE_CAMPAIGN,
ADD_CAMPAIGN,
ADD_NOTEPAD,
ADD_SUBNOTEPAD,
GRAB_CAMPAIGNS,
CHANGE_NOTEPAD,
CHANGE_SUBNOTEPAD
} from '../actions/notes';

export default function notesOptions(state = {current: {campaign: '', notepad: '', subnotepad: ''}, all: []}, action) {
	switch (action.type) {
		case CHANGE_CAMPAIGN:
			state.current.campaign = action.campaign;
			state.current.notepad = (Object.keys(action.data)[0]) ? Object.keys(action.data)[0] : '';
			state.current.subnotepad = (action.data[Object.keys(action.data)[0]][0].subnotepad) ? action.data[Object.keys(action.data)[0]][0].subnotepad : '';
			return state;
		case ADD_CAMPAIGN:
			state.all.push(action.campaign);
			state.current.campaign = action.campaign;
			state.current.notepad = 'First Tab';
			state.current.subnotepad = 'First Subtab';
			return state;
		case GRAB_CAMPAIGNS:
			state.all = action.data;
			return state;
		case ADD_NOTEPAD: 
			state.current.notepad = action.notepad;
			state.current.subnotepad = '';
			return state;
		case CHANGE_NOTEPAD:
			state.current.notepad = action.notepad;
			if(action.data !== ''){
				state.current.subnotepad = action.data[0].subnotepad;
			} else {state.current.subnotepad = '';}
			return state;
		case ADD_SUBNOTEPAD:
		case CHANGE_SUBNOTEPAD:
			state.current.subnotepad = action.subnotepad;
			return state;
		default:
			return state;
	}
}