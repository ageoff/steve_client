import { createAction, handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'

let INITIAL_STATE = Immutable({
    selectedTree: {},
    data: [
        {
            name: 'First Tree',
            id: 'asd',
            nodes: [
                {
                    name: 'First node',
                    id: 'qwe',
                    nodes: [
                        {
                            name: 'Second Level Node',
                            id: '4321',
                            nodes: []
                        }
                    ]
                },
                {
                    name: 'Second Level Node',
                    id: '22333',
                    nodes: [
                        {
                            name: 'Another Node',
                            id: '4424',
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
export const saveNode = (node) => {
    return (dispatch, getState) => {
        let data = getState().tree.data
        dispatch(setTreeData([...data, node]))
    }
}
