import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import createEncryptor from 'redux-persist-transform-encrypt'
import thunk from 'redux-thunk'

import userReducer from './user'
import * as user from './user'
import treeReducer from './tree'
import * as tree from './tree'
import appReducer from './app'
import * as app from './app'

const encryptor = createEncryptor({
	secretKey: 'spot-lager-extra'
})
const config = {
	key: 'root',
	transforms: [encryptor],
	storage: sessionStorage
}
const reducers = persistCombineReducers(config, {
	user: userReducer,
	tree: treeReducer,
	app: appReducer
})

export const ActionCreators = {
	...user,
	...tree,
	...app
}

const middleware = [ thunk ]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))
export const persistor = persistStore(store)
