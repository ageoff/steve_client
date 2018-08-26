import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Collapse } from 'antd';
import { setSelectedTree, saveNode, setAddNode, setEditNode } from '../redux/tree'
import { setAdminView } from '../redux/app'
import { aViewManage, aViewEdit, aViewAdd } from '../lib/constants'
import uuid from 'uuid/v4'

import styles from '../assets/css/style.css'

const { Panel } = Collapse.Panel
const emptyNode = {name: 'Untitled Node', id:uuid(), nodes: []}

class Admin extends React.Component {

    generateNode() {
        return {
            name: 'Untitled Node',
            id: uuid(),
            nodes: []
        }
    }

    deleteNode(id) {
        const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
        let temp = aView === aViewAdd ? {...addNode} : {...editNode}
        const filterNodes = (nodes, checkId) => {
            nodes = nodes.filter(item => item.id !== checkId)
            nodes.forEach(n => n.nodes = filterNodes(n.nodes, checkId))
            return nodes
        }
        temp.nodes = filterNodes(temp.nodes, id)
        if (aView === aViewAdd) setAddNode(temp)
        else setEditNode(temp)
    }

    modifyNode(id, text) {
        const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
        let one = (aView === aViewAdd) ? {...addNode} : {...editNode}
        let temp = {...one}
        const checkNodes = (n, checkId) => {
            if (n.id === checkId) n.name = text
            else n.nodes.forEach(j => checkNodes(j, checkId))
        }
        checkNodes(temp, id)
        if (aView === aViewAdd) setAddNode(temp)
        else setEditNode(temp)
    }

    addNewNode(id) {
        const { addNode, editNode, setAddNode, setEditNode, aView } = this.props
        let temp = aView === aViewAdd ? {...addNode} : {...editNode}
        const checkNodes = (n, checkId) => {
            if (n.id === checkId) n.nodes = [...n.nodes, this.generateNode()]
            else n.nodes.forEach(j => checkNodes(j, checkId))
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
                {node.nodes.length > 0 && node.nodes.map(n => (
                    <Collapse.Panel header={n.name} key={n.name}>
                        {n.nodes.length > 0 && this.renderNodes(n)}
                    </Collapse.Panel>
                ))}
            </Collapse>
        )
    }

	render() {
        const { trees, aView, selectedTree, setAdminView, saveNode, setEditNode, addNode, editNode } = this.props
        const renderAddN = (node) => (
            <div>
                {node.nodes.map(n => (
                    <Collapse>
                        <Collapse.Panel header={n.name}>
                            <p className={styles.inputLabel}>{'Name: '}</p><input className={styles.inputBox} value={n.name} onChange={e=>this.modifyNode(n.id, e.target.value)}/>
                            <div className={styles.addNode} onClick={this.addNewNode.bind(this, n.id)}><Icon type='plus' /></div>
                            <div className={styles.deleteNode} onClick={this.deleteNode.bind(this, n.id)}><Icon type='delete' /></div>
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
                    <h1>{'Manage Decision Trees'}</h1>
                    <h3 onClick={()=>setAdminView(aViewAdd)}>{'Add New Node'}</h3>
                    {[...trees].map(tree => (
                        <div>
                            <p>{tree.name}</p>
                            <p onClick={this.editTree.bind(this, tree)}>Click Here to Edit Decision tree</p>
                        </div>
                    ))}
                </div>
            )
        case aViewEdit:
            return (
                <div>
                    <h1>{'Edit Tree: ' + editNode.name}</h1>
                    <Collapse>
                        <Collapse.Panel header={editNode.name}>
                            <p className={styles.inputLabel}>{'Decision Tree Name: '}</p><input className={styles.inputBox} value={editNode.name} onChange={e=>this.modifyNode(editNode.id, e.target.value)}/>
                            <div className={styles.addNode} onClick={() => this.addNewNode(editNode.id)}><Icon type='plus' /></div>
                            {renderAddN(editNode)}
                        </Collapse.Panel>
                    </Collapse>
                    <div onClick={() => {
                        console.log('HERE IS WHERE THE EDIT IS::::')
                        console.log(editNode)
                        console.log(editNode.id)
                        saveNode({...editNode}, editNode.id)
                        setEditNode({...emptyNode})
                        setAdminView(aViewManage)
                    }}><h3>{'Save'}</h3></div>
                    <p onClick={() => setAdminView(aViewManage)}>{'Cancel'}</p>
                </div>
            )
        case aViewAdd:
            return (
                <div>
                    <h1>{'Add Tree'}</h1>
                    <Collapse>
                        <Collapse.Panel header={addNode.name}>
                            <p className={styles.inputLabel}>{'Decision Tree Name: '}</p><input className={styles.inputBox} value={addNode.name} onChange={e=>this.modifyNode(addNode.id, e.target.value)}/>
                            <div className={styles.addNode} onClick={() => this.addNewNode(addNode.id)}><Icon type='plus' /></div>
                            {renderAddN(addNode)}
                        </Collapse.Panel>
                    </Collapse>
                    <div onClick={() => {
                        saveNode({...addNode})
                        setAddNode({...emptyNode})
                        setAdminView(aViewManage)
                    }}><h3>{'Save'}</h3></div>
                    <p onClick={() => setAdminView(aViewManage)}>{'Cancel'}</p>
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
