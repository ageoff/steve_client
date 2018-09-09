import { createAction, handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'

let INITIAL_STATE = Immutable({
	location: {}
})

// reducer
export default handleActions({
	RESET_USER_STATE: () => (INITIAL_STATE),
	REHYDRATE_ALL_STATES: (state) => ({...state, LoadedFromDisk: true}),
	SET_ROUTE_LOCATION: (state, action) => ({...state, location: action.payload})
}, INITIAL_STATE)

export const setRouteLocation = createAction('SET_ROUTE_LOCATION')