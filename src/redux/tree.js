import { createAction, handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import uuid from 'uuid/v4'

let INITIAL_STATE = {
    selectedTree: {},
    addNode:  {name: 'Untitled Node', id:uuid(), nodes: [], average: 0},
    editNode: {},
    data: [
        {
            name: 'Siding & Trim',
            id: uuid(),
            nodes: [
                {
                    name: 'Trim',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Exterior Trim',
                            id: uuid(),
                            nodes: [
                                {
                                    name: 'Repair',
                                    id: uuid(),
                                    nodes: [],
                                    average: 0
                                },
                                {
                                    name: 'Replace',
                                    id: uuid(),
                                    nodes: [],
                                    average: 1779
                                }
                            ]
                        },
                        {
                            name: 'Interior Trim',
                            id: uuid(),
                            nodes: [
                                {
                                    name: 'Repair',
                                    id: uuid(),
                                    nodes: [],
                                    average: 625
                                },
                                {
                                    name: 'Replace',
                                    id: uuid(),
                                    nodes: [],
                                    average: 1234
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'General Siding',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Repair',
                            id: uuid(),
                            nodes: [],
                            average: 540
                        },
                        {
                            name: 'Replace',
                            id: uuid(),
                            nodes: [],
                            average: 9161
                        }
                    ]
                },
                {
                    name: 'Vinyl or Liquid Siding',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Vinyl',
                            id: uuid(),
                            nodes: [
                                {
                                    name: 'Repair',
                                    id: uuid(),
                                    nodes: [],
                                    average: 0
                                },
                                {
                                    name: 'Replace',
                                    id: uuid(),
                                    nodes: [],
                                    average: 9775
                                }
                            ]
                        },
                        {
                            name: 'Liquid',
                            id: uuid(),
                            nodes: [
                                {
                                    name: 'Apply',
                                    id: uuid(),
                                    nodes: [],
                                    average: 4555
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Wood or Cement Siding',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Repair',
                            id: uuid(),
                            nodes: [],
                            average: 1074
                        },
                        {
                            name: 'Replace',
                            id: uuid(),
                            nodes: [],
                            average: 11310
                        }
                    ]
                },
                {
                    name: 'Stucco Siding',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Repair',
                            id: uuid(),
                            nodes: [],
                            average: 1175
                        },
                        {
                            name: 'Replace',
                            id: uuid(),
                            nodes: [],
                            average: 3782
                        }
                    ]
                },
                {
                    name: 'Metal or Steel Siding',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Repair',
                            id: uuid(),
                            nodes: [],
                            average: 1296
                        },
                        {
                            name: 'Replace',
                            id: uuid(),
                            nodes: [],
                            average: 7725
                        }
                    ]
                },
                {
                    name: 'Asbestos Siding',
                    id: uuid(),
                    nodes: [
                        {
                            name: 'Repair',
                            id: uuid(),
                            nodes: [],
                            average: 3280
                        },
                        {
                            name: 'Replace',
                            id: uuid(),
                            nodes: [],
                            average: 0
                        }
                    ]
                },
            ]

        }
    ]
}

// reducer
export default handleActions({
	RESET_USER_STATE: () => (INITIAL_STATE),
	SET_TREE_DATA: (state, action) => ({...state, data: action.payload}),
    SET_SELECTED_TREE: (state, action) => ({...state, selectedTree: action.payload}),
    SET_ADD_NODE: (state, action) => ({...state, addNode: action.payload}),
    SET_EDIT_NODE: (state, action) => ({...state, editNode: action.payload})
}, {...INITIAL_STATE})

export const setTreeData = createAction('SET_TREE_DATA')
export const setSelectedTree = createAction('SET_SELECTED_TREE')
export const setAddNode = createAction('SET_ADD_NODE')
export const setEditNode = createAction('SET_EDIT_NODE')
export const saveNode = (node, id = undefined) => {
    return (dispatch, getState) => {
        let data = [...getState().tree.data]
        console.log('HERE IS THE DATA: ')
        console.log(data)
        let index = -1
        console.log(node)
        console.log(id)
        if (id != null) {
            console.log(id)
            data.every((n, i) => {
                console.log(n)
                if (n.id===id) {
                    index = i
                    return false
                }
                return true
            })
        }
        if (index > -1) {
            data[index] = {...node}
            dispatch(setTreeData(data))
        }
        else {
            dispatch(setTreeData([...data, {...node}]))
        }
    }
}
