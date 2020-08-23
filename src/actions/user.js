import * as api from '../API';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';
export const NEW_USER = 'NEW_USER';
export const DND_STATUS = 'DND_STATUS';

function checkPassword(check, userInfo) {
	return {
		type: CHECK_PASSWORD,
		check,
		userInfo
	};
}

function newUser(status, firstName, lastName, username) {
	return {
		type: NEW_USER,
		status,
		firstName,
		lastName,
		username
	};
}

function dndStatus(status) {
	return {
		type: DND_STATUS,
		status,
	};
}

export function handleCheckPassword(username, password) {
	return async (dispatch) => {
		await api.checkPassword(username, password)
			.then((result) => {
				dispatch(dndStatus(false));
				dispatch(checkPassword(result.check, result.userInfo));
			});
	}
}

export function handleNewUser(username, firstName, lastName, password, passwordCheck) {
	if(passwordCheck === 'create'){
		return async (dispatch) => {
			await api.newUser(username, firstName, lastName, password)
				.then((result) => {
					dispatch(dndStatus(false));
					dispatch(newUser(result, firstName, lastName, username));
				});
		}
	} else if(passwordCheck === 'dnd'){
		return async (dispatch) => {
			dispatch(dndStatus(true));
		}
	} else {
		return async (dispatch) => {
			dispatch(dndStatus(false));
			dispatch(newUser(false, '', '', ''));
		}
	}
}