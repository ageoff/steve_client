import { createAction, handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'

let INITIAL_STATE = Immutable({
    selectedTree: {},
    data: [
        {
            name: 'First Tree',
            nodes: [
                {
                    name: 'First node',
                    nodes: [
                        {
                            name: 'Second Level Node',
                            nodes: []
                        }
                    ]
                },
                {
                    name: 'Second Level Node',
                    nodes: [
                        {
                            name: 'Another Node',
                            nodes: []
                        }
                    ]
                }
            ]
            
        }
    ]
})

// reducer
export default handleActions({
	RESET_USER_STATE: () => (INITIAL_STATE),
	SET_TREE_DATA: (state, action) => ({...state, data: action.payload}),
    SET_SELECTED_TREE: (state, action) => ({...state, selectedTree: action.payload})
}, INITIAL_STATE)

export const setTreeData = createAction('SET_TREE_DATA')
export const setSelectedTree = createAction('SET_SELECTED_TREE')