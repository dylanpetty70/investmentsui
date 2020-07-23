export const INITIAL_DATA = 'INITIAL_DATA';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';


export function handleAddCard (card, index) {
	return{
		type: ADD_CARD,
		card,
		index
	}
}

export function handleAddDeck (deck) {
	return{
		type: ADD_DECK,
		deck
	}
}

export function handleDeleteDeck(decks){
	return{
		type: DELETE_DECK,
		decks
	}
}