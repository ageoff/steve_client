import { routeTable } from './routeTable'

export const filterRole = roles => {
	return routeTable.filter(route => {
		for (let i=0; i < roles.length; i++) {
			for (let ii=0; ii < route.roles.length; ii++) {
				if (roles[i] === route.roles[ii]) return true
			}
		}
		return false
	})
}

export const locToCS = loc => {
	for (let i = 0; i < routeTable.length; i++) {
		if (routeTable[i].path === loc.pathname) {
			return ({
				careScenario: routeTable[i].careScenario,
				csName: routeTable[i].csName
			})
		}
	}
	return ({
		careScenario: routeTable[0].careScenario,
		csName: routeTable[0].csName
	})
}

export const keyToPath = key => {
	for (let i=0; i < routeTable.length; i++) {
		if (routeTable[i].key === key) return routeTable[i].path
	}
	return routeTable[0].path
}

export const pathToKey = path => {
	for (let i=0; i < routeTable.length; i++) {
		if (routeTable[i].path === path) return routeTable[i].key
	}
	return routeTable[0].key
}

export const pathToTitle = path => {
	for (let i=0; i < routeTable.length; i++) {
		if (routeTable[i].path === path) return routeTable[i].title
	}
	return routeTable[0].title
}

export const content = loc => {
	for (let i = 0; i < routeTable.length; i++) {
		if (routeTable[i].path === loc.pathname) {
			return routeTable[i].content
		}
	}
	return routeTable[0].content
}

export const showHeader = loc => {
	for (let i = 0; i < routeTable.length; i++) {
		if (routeTable[i].path === loc.pathname) {
			return routeTable[i].showHeader
		}
	}
	return routeTable[0].showHeader
}

export const showEventComponents = loc => {
	for (let i = 0; i < routeTable.length; i++) {
		if (routeTable[i].path === loc.pathname) {
			return routeTable[i].showEventComponents
		}
	}
	return routeTable[0].showEventComponents
}