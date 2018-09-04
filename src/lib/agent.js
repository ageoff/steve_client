import {create} from 'apisauce'

let state = {
	api: null,
}

const configure = (baseURL, token = '') => {
	state.api = create({
		baseURL: baseURL,
		headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': "*",
										'Accept': 'application/json'}
	})
	// setToken(token)
}

const login = (email, password) => {
	return state.api.post('/token', {email: email, password: password, portal: true})
		.then((response) => {
			if (response.ok) {
				setToken(response.data.Token)
			}
			return response
		})
}

const setToken = token => {
	// state.api.setHeader('Authorization', 'Bearer ' + token)
}

const saveNode = payload => state.api.post('/node/add', payload)
const updateNode = payload => state.api.post('/node/update', payload)
const deleteNode = payload => state.api.post('/node/delete', payload)
const getNodes = () => {
	console.log('HEY WE ARE HERE')
	return state.api.get('/node/all')
}

const Agent = {
	configure,
	saveNode,
	updateNode,
	deleteNode,
	getNodes
}
export default Agent
