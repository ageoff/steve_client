import { createAction, handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import { aViewManage } from '../lib/constants'

let INITIAL_STATE = Immutable({
	adminView: aViewManage,
	currentTree: '',
	selectedTrees: []
})

// reducer
export default handleActions({
	RESET_USER_STATE: () => (INITIAL_STATE),
	REHYDRATE_ALL_STATES: (state) => ({...state, LoadedFromDisk: true}),
	SET_ADMIN_VIEW: (state, action) => ({...state, adminView: action.payload}),
	SET_CURRENT_TREE: (state, action) => ({...state, currentTree: action.payload}),
	SET_SELECTED_TREES: (state, action) => ({...state, selectedTrees: action.payload})
}, INITIAL_STATE)

export const setAdminView = createAction('SET_ADMIN_VIEW')
export const setCurrentTree = createAction('SET_CURRENT_TREE')
export const setSelectedTrees = createAction('SET_SELECTED_TREES')
export const addSelectedTree = (id) => {
	return (dispatch, getState) => {
		let data = [...getState().app.selectedTrees]
		dispatch(setSelectedTrees([...data, id]))
	}
}
export const deleteSelectedTree = (id) => {
	return (dispatch, getState) => {
		let data = [...getState().app.selectedTrees]
		let index = -1
		data.every((d, i) => {
			if (d === id) {
				index = i
				return false
			}
			return true
		})
		dispatch(setSelectedTrees(data.splice(index, 1)))
	}
}
