import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { PersistGate } from 'redux-persist/es/integration/react'

import { store as ReduxStore, persistor } from './redux'
import { setHistory, resetHistory, resetUserState } from './redux/user'

export const store = ReduxStore

const onBeforeLift = () => {}

render(
    <Provider store={store}>
		<PersistGate
			persistor={persistor}
			onBeforeLift={onBeforeLift}>
			<App/>
		</PersistGate>
    </Provider>,
    document.getElementById('root')
)