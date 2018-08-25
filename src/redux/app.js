import { createAction, handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import { aViewManage } from '../lib/constants'

let INITIAL_STATE = Immutable({
    adminView: aViewManage
})

// reducer
export default handleActions({
	RESET_USER_STATE: () => (INITIAL_STATE),
	REHYDRATE_ALL_STATES: (state) => ({...state, LoadedFromDisk: true}),
	SET_ADMIN_VIEW: (state, action) => ({...state, adminView: action.payload})
}, INITIAL_STATE)

export const setAdminView = createAction('SET_ADMIN_VIEW')