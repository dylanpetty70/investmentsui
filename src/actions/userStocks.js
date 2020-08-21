import * as api from '../API';
export const NEW_STOCK = 'NEW_STOCK';
export const DELETE_STOCK = 'DELETE_STOCK';

function newStock(result) {
	return {
		type: NEW_STOCK,
		result
	};
}

function deleteStock(result) {
	return {
		type: DELETE_STOCK,
		result
	};
}

export function handleNewStock(user, stock) {
	return async (dispatch) => {
		await api.newStock(user, stock)
			.then((result) => {
				dispatch(newStock(result));
			});
	}
}

export function handleDeleteStock(user, key) {
	return async (dispatch) => {
		await api.deleteStock(user, key)
			.then((result) => {
				dispatch(deleteStock(result));
			});
	}
}