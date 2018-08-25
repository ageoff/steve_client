import React from 'react'

import Entry from '../components/Entry'
import Admin from '../components/Admin'
import Decision from '../components/Decision'

export const routeTable = [
	{
		title: 'Entry',
		key: 'Entry',
		icon: 'area-chart',
		path: '/app/entry',
		content: <Entry />,
		careScenario: '',
		csName: '',
		showHeader: true,
		showEventComponents: false,
		roles: [3, 4, 5, 6, 7, 8]
	},
    {
		title: 'Admin',
		key: 'Admin',
		icon: 'area-chart',
		path: '/app/admin',
		content: <Admin />,
		careScenario: '',
		csName: '',
		showHeader: true,
		showEventComponents: false,
		roles: [3, 4, 5, 6, 7, 8]
	},
    {
		title: 'Decision',
		key: 'Decision',
		icon: 'area-chart',
		path: '/app/decision',
		content: <Decision />,
		careScenario: '',
		csName: '',
		showHeader: true,
		showEventComponents: false,
		roles: [3, 4, 5, 6, 7, 8]
	}
]