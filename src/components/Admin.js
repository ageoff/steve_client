import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Collapse } from 'antd'
import { setSelectedTree, saveNode, setAddNode, setEditNode } from '../redux/tree'
import { setAdminView } from '../redux/app'
import { aViewManage, aViewEdit, aViewAdd } from '../lib/constants'
import uuid from 'uuid/v4'
import { filterNodes, modifyNodes } from '../services/nodetools'
import styles from '../assets/css/style.css'

const { Panel } = Collapse.Panel
const emptyNode = {name: 'Untitled Node', uuid:uuid(), children: [], value: 0}

class Admin extends React.Component {

	generateNode() {
		return {
			name: 'Untitled Node',
			uuid: uuid(),
			children: []
		}
	}

	deleteNode(id) {
		const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
		let temp = aView === aViewAdd ? {...addNode} : {...editNode}
		temp.children = filterNodes(temp.children, id)
		if (aView === aViewAdd) setAddNode(temp)
		else setEditNode(temp)
	}

	editNode(id, text) {
		const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
		let temp = (aView === aViewAdd) ? {...addNode} : {...editNode}
		modifyNodes(temp, id, text)
		if (aView === aViewAdd) setAddNode(temp)
		else setEditNode(temp)
	}

	modifyNodeAverage(id, text) {
		const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
		let one = (aView === aViewAdd) ? {...addNode} : {...editNode}
		let temp = {...one}
		const checkNodes = (n, checkId) => {
			if (n.uuid === checkId) n.value = Number(text)
			else n.children.forEach(j => checkNodes(j, checkId))
		}
		checkNodes(temp, id)
		if (aView === aViewAdd) setAddNode(temp)
		else setEditNode(temp)
	}

	addNewNode(id) {
		const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
		let temp = aView === aViewAdd ? {...addNode} : {...editNode}
		const checkNodes = (n, checkId) => {
			if (n.uuid === checkId) n.children = [...n.children, this.generateNode()]
			else n.children.forEach(j => checkNodes(j, checkId))
		}
		checkNodes(temp, id)
		if (aView === aViewAdd) setAddNode(temp)
		else setEditNode(temp)
	}

	editTree(tree) {
		const { setEditNode, setAdminView} = this.props
		console.log(tree)
		setEditNode(tree)
		setAdminView(aViewEdit)
	}

	renderNodes(node) {
		return (
			<Collapse>
				{node.children.length > 0 && node.children.map(n => (
					<Collapse.Panel header={n.name} key={n.name}>
						{n.children.length > 0 && this.renderNodes(n)}
					</Collapse.Panel>
				))}
			</Collapse>
		)
	}

	render() {
		const { trees, aView, selectedTree, setAdminView, saveNode, setEditNode, addNode, editNode } = this.props
		const renderAddN = (node) => (
			<div>
				{node.children.map(n => (
					<Collapse className={styles.sectionTitle}>
						<Collapse.Panel header={n.name}>
							<div className={styles.nodeInputContainer}>
								<div className={styles.inputBox}>
									<p className={styles.crumbText}><span>{'Name: '}</span><input value={n.name} onChange={e=>this.editNode(n.uuid, e.target.value)}/></p>
									<p className={styles.crumbText}><span>{'value: $'}</span><input type='number' step='0.01' value={n.value || 0} onChange={e=>this.modifyNodeAverage(n.uuid, e.target.value)}/></p>
								</div>
								<div className={styles.inputController} >
									<Icon className={styles.deleteIcon} type='delete' onClick={this.deleteNode.bind(this, n.uuid)}/>
									<Icon className={styles.addIcon} type='plus' onClick={this.addNewNode.bind(this, n.uuid)}/>
								</div>
							</div>
							{renderAddN(n)}
						</Collapse.Panel>
					</Collapse>
				))}
			</div>
		)
		switch (aView) {
		case aViewManage:
			return (
				<div>
					<p className={styles.pageTitle}>{'Manage Decision Trees'}</p>
					<div className={styles.adminContainer}>
						<div className={styles.addContainer}>
							<div className={styles.addButton}><p className={styles.buttonText} onClick={()=>setAdminView(aViewAdd)}>{'Add New Node'}</p></div>
						</div>
						{[...trees].map(tree => (
							<div className={styles.manageNode}>
								<p className={styles.nodeText}>{tree.name}</p>
								<div className={styles.editButton}><p className={styles.smallButtonText} onClick={this.editTree.bind(this, tree)}>{'Edit Node'}</p></div>
							</div>
						))}
					</div>
				</div>
			)
		case aViewEdit:
			return (
				<div>
					<p className={styles.pageTitle}>{'Edit Tree: ' + editNode.name}</p>
					<div className={styles.adminContainer}>
						<Collapse defaultActiveKey={['1']} className={styles.sectionTitle}>
							<Collapse.Panel header={editNode.name}>
								<div className={styles.nodeInputContainer}>
									<div className={styles.inputBox}>
										<p className={styles.crumbText}><span>{'Tree Name: '}</span><input value={editNode.name} onChange={e=>this.editNode(editNode.uuid, e.target.value)}/></p>
									</div>
									<div className={styles.addNode} onClick={() => this.addNewNode(editNode.uuid)}>
										<Icon className={styles.addIcon} type='plus' />
									</div>
								</div>
								{renderAddN(editNode)}
							</Collapse.Panel>
						</Collapse>
						<div className={styles.buttonContainer}>
							<div className={styles.cancelButton}><p className={styles.buttonText} onClick={() => setAdminView(aViewManage)}>{'Cancel'}</p></div>
							<div className={styles.saveButton} onClick={() => {
								saveNode({...editNode}, editNode.uuid)
								setEditNode({...emptyNode})
								setAdminView(aViewManage)
							}}><p className={styles.buttonText}>{'Save'}</p></div>
						</div>
					</div>
				</div>
			)
		case aViewAdd:
			return (
				<div>
					<p className={styles.pageTitle}>{'Add Tree'}</p>
					<div className={styles.adminContainer}>
						<Collapse defaultActiveKey={['1']} className={styles.sectionTitle}>
							<Collapse.Panel header={addNode.name}>
								<div className={styles.nodeInputContainer}>
									<div className={styles.inputBox}>
										<p className={styles.crumbText}><span>{'Tree Name: '}</span><input value={addNode.name} onChange={e=>this.editNode(addNode.uuid, e.target.value)}/></p>
									</div>
									<div className={styles.addNode} onClick={() => this.addNewNode(addNode.uuid)}>
										<Icon className={styles.addIcon} type='plus' />
									</div>
								</div>
								{renderAddN(addNode)}
							</Collapse.Panel>
						</Collapse>
						<div className={styles.buttonContainer}>
							<div className={styles.cancelButton}><p className={styles.buttonText} onClick={() => setAdminView(aViewManage)}>{'Cancel'}</p></div>
							<div className={styles.saveButton} onClick={() => {
								saveNode({...addNode})
								setAddNode({...emptyNode})
								setAdminView(aViewManage)
							}}><p className={styles.buttonText}>{'Save'}</p></div>
						</div>
					</div>
				</div>
			)
		}
	}
}
Admin.propTypes = {
	trees: PropTypes.array.isRequired,
	selectedTree: PropTypes.object.isRequired,
	aView: PropTypes.string.isRequired,
	addNode: PropTypes.object.isRequired,
	editNode: PropTypes.object.isRequired,
	//Fuctions
	setSelectedTree: PropTypes.func.isRequired,
	setAdminView: PropTypes.func.isRequired,
	saveNode: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	trees: state.tree.data,
	selectedTree: state.tree.selectedTree,
	aView: state.app.adminView,
	addNode: state.tree.addNode,
	editNode: state.tree.editNode
})
const mapDispatchToProps = dispatch => ({
	setSelectedTree: (tree) => dispatch(setSelectedTree(tree)),
	setAdminView: (view) => dispatch(setAdminView(view)),
	saveNode: (node, id = undefined) => dispatch(saveNode(node, id)),
	setAddNode: (node) => dispatch(setAddNode(node)),
	setEditNode: (node) => dispatch(setEditNode(node))
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
