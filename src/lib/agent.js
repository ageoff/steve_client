import {create} from 'apisauce'

let state = {
	api: null
}

const configure = baseURL => {
	state.api = create({
		baseURL: baseURL,
		headers: {'Content-Type': 'application/json',
			'Accept': 'application/json'}
	})
}

const saveNode = payload => state.api.post('/node/add', payload)
const updateNode = payload => state.api.post('/node/update', payload)
const deleteNode = payload => state.api.post('/node/delete', payload)
const getNodes = () => state.api.get('/node/all')
const getTrees = () => state.api.get('/node/trees')

const Agent = {
	configure,
	saveNode,
	updateNode,
	deleteNode,
	getNodes,
	getTrees
}
export default Agent
