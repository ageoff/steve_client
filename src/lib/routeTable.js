import React from 'react'

import Entry from '../components/Entry'
import Admin from '../components/Admin'
import Decision from '../components/Decision'

export const routeTable = [
	{
		title: 'Home',
		key: 'Entry',
		icon: 'home',
		path: '/app/entry',
		content: <Entry />,
		careScenario: '',
		csName: '',
		showHeader: true,
		inSideNav: true,
		roles: [3, 4, 5, 6, 7, 8]
	},
    {
		title: 'Admin',
		key: 'Admin',
		icon: 'user',
		path: '/app/admin',
		content: <Admin />,
		careScenario: '',
		csName: '',
		showHeader: true,
		inSideNav: true,
		roles: [3, 4, 5, 6, 7, 8]
	},
    {
		title: 'Report Builder',
		key: 'Decision',
		icon: 'fork',
		path: '/app/decision',
		content: <Decision />,
		careScenario: '',
		csName: '',
		showHeader: true,
		inSideNav: true,
		roles: [3, 4, 5, 6, 7, 8]
	}
]
