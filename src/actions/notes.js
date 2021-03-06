import * as api from '../API';
export const CHANGE_CAMPAIGN = 'CHANGE_CAMPAIGN';
export const ADD_CAMPAIGN = 'ADD_CAMPAIGN';
export const ADD_NOTEPAD = 'ADD_NOTEPAD';
export const ADD_SUBNOTEPAD = 'ADD_SUBNOTEPAD';
export const ADD_NOTE = 'ADD_NOTE';
export const GRAB_CAMPAIGNS = 'GRAB_CAMPAIGNS';
export const CHANGE_SUBNOTEPAD = 'CHANGE_SUBNOTEPAD';
export const CHANGE_NOTEPAD = 'CHANGE_NOTEPAD';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

function grabCampaigns(data){
	return{
		type: GRAB_CAMPAIGNS,
		data
	}
}

function changeCampaign(campaign, data){
	return {
		type: CHANGE_CAMPAIGN,
		campaign,
		data
	}
}

function addCampaign(campaign, data){
	return {
		type: ADD_CAMPAIGN,
		campaign,
		data
	}
}

function addNotepad(data, notepad){
	return {
		type: ADD_NOTEPAD,
		data,
		notepad
	}
}

function addSubnotepad(data,subnotepad){
	return {
		type: ADD_SUBNOTEPAD,
		data,
		subnotepad
	}
}

function addNote(data){
	return {
		type: ADD_NOTE,
		data
	}
}

function updateNote(data){
	return {
		type: UPDATE_NOTE,
		data
	}
}

function deleteNote(data){
	return {
		type: DELETE_NOTE,
		data
	}
}

export function changeNotepad(notepad, data){
	return {
		type: CHANGE_NOTEPAD,
		notepad,
		data
	}
}

export function changeSubnotepad(subnotepad){
	return {
		type: CHANGE_SUBNOTEPAD,
		subnotepad
	}
}

export function handleGrabCampaigns(){
	return async (dispatch) => {
		await api.grabCampaigns()
			.then((data) => {
				dispatch(grabCampaigns(data));
			})
	}
}

export function handleChangeCampaign(campaign){
	return async (dispatch) => {
	await api.changeCampaign(campaign)
		.then((data) => {
			dispatch(changeCampaign(campaign, data));
		})
	}
}

export function handleAddCampaign(campaign){
	return async (dispatch) => {
		await api.addCampaign(campaign)
			.then((data) => {
				dispatch(addCampaign(campaign, data));
			})
	}
}

export function handleAddNotepad(campaign, notepad){
	return async (dispatch) => {
		await api.addNotepad(campaign, notepad)
			.then((data) => {
				dispatch(addNotepad(data, notepad));
			})
	}
}

export function handleAddSubnotepad(campaign, notepad, subnotepad){
	return async (dispatch) => {
		await api.addSubnotepad(campaign, notepad, subnotepad)
			.then((data) => {
				dispatch(addSubnotepad(data, subnotepad));
			})
	}
}

export function handleAddNote(campaign, notepad, subnotepad, object, size){
	return async (dispatch) => {
		await api.addNote(campaign, notepad, subnotepad, object, size)
			.then((data) => {
				dispatch(addNote(data));
			})
	}
}

export function handleUpdateNote(campaign, notepad, subnotepad, note){
	return async (dispatch) => {
		await api.updateNote(campaign, notepad, subnotepad, note)
			.then((data) => {
				dispatch(updateNote(data));
			})
	}
}

export function handleDeleteNote(campaign, notepad, subnotepad, note){
	return async (dispatch) => {
		await api.deleteNote(campaign, notepad, subnotepad, note)
			.then((data) => {
				dispatch(deleteNote(data));
			})
	}
}