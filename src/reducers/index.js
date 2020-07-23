import { INITIAL_DATA, ADD_CARD, ADD_DECK, DELETE_DECK } from '../actions/index';
import { combineReducers } from 'redux';
import update from 'immutability-helper';

function decks (state = [], action){
	switch (action.type) {
		case INITIAL_DATA :
			return action.decks
		case ADD_CARD :
			return update(state, {[action.index]: {cards: {$push: action.card}}})
		case ADD_DECK : 
			return state.concat(action.deck)
		case DELETE_DECK :
			return action.decks
		default :
			return state
	}
}

export default combineReducers({decks})