import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import createEncryptor from 'redux-persist-transform-encrypt'
import thunk from 'redux-thunk'

import userReducer from './user'
import * as user from './user'

const encryptor = createEncryptor({
	secretKey: 'spot-lager-extra'
})
const config = {
	key: 'root',
	transforms: [encryptor],
	storage: sessionStorage
}
const reducers = persistCombineReducers(config, {
	user: userReducer
})

export const ActionCreators = {
	...user
}

const middleware = [ thunk ]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))
export const persistor = persistStore(store)