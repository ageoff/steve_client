import uuid from 'uuid/v4'

const _emptyNode = {
	id: undefined,
	name: 'Untitled Node',
	uuid: uuid(),
	children: []
}

export const filterNodes = (nodes, checkId) => {
	nodes = nodes.filter(item => item.uuid !== checkId)
	nodes.forEach(n => n.children = filterNodes(n.children, checkId))
	return nodes
}

export const checkNodes = (n, checkId, text) => {
	if (n.uuid === checkId) n.name = text
	else n.children.forEach(j => checkNodes(j, checkId, text))
}

export const modifyNodes = (node, id, text) => {
	checkNodes(node, id, text)
}
