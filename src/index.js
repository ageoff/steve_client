import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { PersistGate } from 'redux-persist/es/integration/react'

import { store as ReduxStore, persistor } from './redux'
import { setHistory, resetHistory, resetUserState } from './redux/user'
import { loadNodes } from './redux/tree'
import Agent from './lib/agent'

export const store = ReduxStore

const onBeforeLift = () => {}

const local = 'http://localhost:8080'
const test = 'http://ec2-18-222-146-229.us-east-2.compute.amazonaws.com:8080/steve-server-1.0'

persistor.purge()
Agent.configure(test)
store.dispatch(loadNodes())

render(
    <Provider store={store}>
			<PersistGate
				persistor={persistor}
				onBeforeLift={onBeforeLift}>
					<App/>
			</PersistGate>
    </Provider>,
    document.getElementById('app')
)
