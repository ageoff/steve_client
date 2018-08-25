import { keyToPath, pathToKey, filterRole } from './routeFunc'
import { store } from '../index'
import { setRouteLocation } from '../redux/user'

/*export const navBack = args => {
	let hist = store.getState().user.history
	hist.go(-1)
	store.dispatch(setHistory(hist))
}*/

export const navEntryPage = args => store.dispatch(setRouteLocation({pathname: keyToPath(''), search:'', hash:''}))
export const navAdminPage = args => store.dispatch(setRouteLocation({pathname: keyToPath('Admin'), search:'', hash:''}))
export const navDecisionPage = args => store.dispatch(setRouteLocation({pathname: keyToPath('Decision'), search:'', hash:''}))