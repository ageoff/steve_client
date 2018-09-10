import { createAction, handleActions } from 'redux-actions'
import uuid from 'uuid/v4'
import Agent from '../lib/agent'

let INITIAL_STATE = {
	selectedTree: {},
	addNode:  {name: 'Untitled Node', uuid:uuid(), children: [], value: 0, tree_node: true},
	editNode: {},
	data: []
	/*[
		{
			name: 'Siding & Trim',
			uuid: uuid(),
			nodes: [
				{
					name: 'Trim',
					uuid: uuid(),
					nodes: [
						{
							name: 'Exterior Trim',
							uuid: uuid(),
							nodes: [
								{
									name: 'Repair',
									uuid: uuid(),
									nodes: [],
									value: 0
								},
								{
									name: 'Replace',
									uuid: uuid(),
									nodes: [],
									value: 1779
								}
							]
						},
						{
							name: 'Interior Trim',
							uuid: uuid(),
							nodes: [
								{
									name: 'Repair',
									uuid: uuid(),
									nodes: [],
									value: 625
								},
								{
									name: 'Replace',
									uuid: uuid(),
									nodes: [],
									value: 1234
								}
							]
						}
					]
				},
				{
					name: 'General Siding',
					uuid: uuid(),
					nodes: [
						{
							name: 'Repair',
							uuid: uuid(),
							nodes: [],
							value: 540
						},
						{
							name: 'Replace',
							uuid: uuid(),
							nodes: [],
							value: 9161
						}
					]
				},
				{
					name: 'Vinyl or Liquid Siding',
					uuid: uuid(),
					nodes: [
						{
							name: 'Vinyl',
							uuid: uuid(),
							nodes: [
								{
									name: 'Repair',
									uuid: uuid(),
									nodes: [],
									value: 0
								},
								{
									name: 'Replace',
									uuid: uuid(),
									nodes: [],
									value: 9775
								}
							]
						},
						{
							name: 'Liquid',
							uuid: uuid(),
							nodes: [
								{
									name: 'Apply',
									uuid: uuid(),
									nodes: [],
									value: 4555
								}
							]
						}
					]
				},
				{
					name: 'Wood or Cement Siding',
					uuid: uuid(),
					nodes: [
						{
							name: 'Repair',
							uuid: uuid(),
							nodes: [],
							value: 1074
						},
						{
							name: 'Replace',
							uuid: uuid(),
							nodes: [],
							value: 11310
						}
					]
				},
				{
					name: 'Stucco Siding',
					uuid: uuid(),
					nodes: [
						{
							name: 'Repair',
							uuid: uuid(),
							nodes: [],
							value: 1175
						},
						{
							name: 'Replace',
							uuid: uuid(),
							nodes: [],
							value: 3782
						}
					]
				},
				{
					name: 'Metal or Steel Siding',
					uuid: uuid(),
					nodes: [
						{
							name: 'Repair',
							uuid: uuid(),
							nodes: [],
							value: 1296
						},
						{
							name: 'Replace',
							uuid: uuid(),
							nodes: [],
							value: 7725
						}
					]
				},
				{
					name: 'Asbestos Siding',
					uuid: uuid(),
					nodes: [
						{
							name: 'Repair',
							uuid: uuid(),
							nodes: [],
							value: 3280
						},
						{
							name: 'Replace',
							uuid: uuid(),
							nodes: [],
							value: 0
						}
					]
				}
			]

		}
	]*/
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
		let index = -1
		if (id != null) {
			data.every((n, i) => {
				if (n.uuid===id) {
					index = i
					return false
				}
				return true
			})
		}
		if (index > -1) {
			data[index] = {...node}
			dispatch(setTreeData(data))
			Agent.updateNode(node).then(result => {
				console.log(result)
			}).catch(error => {
				console.log(error)
			})
		}
		else {
			dispatch(setTreeData([...data, {...node}]))
			Agent.saveNode(node).then(result => {
				console.log(result)
			}).catch(error => {
				console.log(error)
			})
		}
	}
}
export const loadNodes = () => {
	return dispatch => {
		Agent.getTrees().then(result => {
			dispatch(setTreeData(result.data))
			console.log(result)
		}).catch(error => {
			console.log(error)
		})
	}
}
