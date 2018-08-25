import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Collapse } from 'antd';
import { setSelectedTree, saveNode } from '../redux/tree'
import { setAdminView } from '../redux/app'
import { aViewManage, aViewEdit, aViewAdd } from '../lib/constants'
import uuid from 'uuid/v4'

import styles from '../assets/css/style.css'

const { Panel } = Collapse.Panel
const emptyNode = {name: 'Untitled Node', id:uuid(), nodes: []}

class Admin extends React.Component {
    state = {
        addNode: emptyNode
    }

    generateNode() {
        return {
            name: 'Untitled Node',
            id: uuid(),
            nodes: []
        }
    }

    deleteNode(id) {
        const { addNode } = this.state
        let temp = {...addNode}
        const filterNodes = (nodes, checkId) => {
            nodes = nodes.filter(item => item.id !== checkId)
            nodes.forEach(n => n.nodes = filterNodes(n.nodes, checkId))
            return nodes
        }
        temp.nodes = filterNodes(temp.nodes, id)
        this.setState({addNode: temp})
    }

    modifyNode(id, text) {
        const { addNode } = this.state
        let temp = {...addNode}
        const checkNodes = (n, checkId) => {
            if (n.id === checkId) n.name = text
            else n.nodes.forEach(j => checkNodes(j, checkId))
        }
        checkNodes(temp, id)
        this.setState({addNode: temp})
    }

    addNewNode(id) {
        const { addNode } = this.state
        let temp = {...addNode}
        const checkNodes = (n, checkId) => {
            if (n.id === checkId) n.nodes = [...n.nodes, this.generateNode()]
            else n.nodes.forEach(j => checkNodes(j, checkId))
        }
        checkNodes(temp, id)
        this.setState({addNode: temp})
    }

    editTree(tree) {
        const { setSelectedTree, setAdminView} = this.props
        setSelectedTree(tree)
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
        const { trees, aView, selectedTree, setAdminView, saveNode } = this.props
        const { addNode } = this.state
        switch (aView) {
        case aViewManage:
            return (
                <div>
                    <h1>{'Manage Decision Trees'}</h1>
                    <h3 onClick={()=>setAdminView(aViewAdd)}>{'Add New Node'}</h3>
                    {trees.map(tree => (
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
                    <h1>{'Edit Tree: ' + selectedTree.name}</h1>
                    {this.renderNodes(selectedTree)}
                    <p onClick={() => setAdminView(aViewManage)}>{'Cancel'}</p>
                </div>
            )
        case aViewAdd:
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
            return (
                <div>
                    <h1>{'Add Tree'}</h1>
                    <Collapse>
                        <Collapse.Panel header={addNode.name}>
                            <p className={styles.inputLabel}>{'Decision Tree Name: '}</p><input className={styles.inputBox} value={addNode.name} onChange={e=>this.setState({addNode: {name: e.target.value, nodes:addNode.nodes}})}/>
                            <div className={styles.addNode} onClick={() => this.addNewNode(addNode.id)}><Icon type='plus' /></div>
                            {renderAddN(addNode)}
                        </Collapse.Panel>
                    </Collapse>
                    <div onClick={() => {
                        saveNode(addNode)
                        this.setState({addNode: emptyNode})
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
    //Fuctions
    setSelectedTree: PropTypes.func.isRequired,
    setAdminView: PropTypes.func.isRequired,
    saveNode: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	trees: state.tree.data,
    selectedTree: state.tree.selectedTree,
    aView: state.app.adminView
})
const mapDispatchToProps = dispatch => ({
	setSelectedTree: (tree) => dispatch(setSelectedTree(tree)),
    setAdminView: (view) => dispatch(setAdminView(view)),
    saveNode: (node) => dispatch(saveNode(node))
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
