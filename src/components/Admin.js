import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { setSelectedTree } from '../redux/tree'
import { setAdminView } from '../redux/app'
import { aViewManage, aViewEdit, aViewAdd } from '../lib/constants'

class Admin extends React.Component {

    editTree(tree) {
        const { setSelectedTree, setAdminView} = this.props
        setSelectedTree(tree)
        setAdminView(aViewEdit)
    }
    
    renderTrees() {
        const { trees } = this.props
        let result = []
        trees.map((tree,i) => {
            result.push (
                <div>
                    <p>{tree.name}</p>
                    <p onClick={this.editTree.bind(this, tree)}>Click Here to Edit Decision tree</p>
                </div>
                
            )
        })
        return result
    }

	render() {
        let { trees, aView, selectedTree, setAdminView } = this.props
        switch (aView) {
        case aViewManage:
            return (
                <div>
                    <h1>Manage Decision Trees</h1>
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
                    <h1>{'Edit Tree ' + selectedTree.name}</h1>
                    {selectedTree.nodes.map(node => (
                        <div>
                            <h3>{node.name}</h3>
                        </div>
                    ))}
                    <p onClick={() => setAdminView(aViewManage)}>Back</p>
                </div>
            )
        case aViewAdd:
            return (
                <div>
                    <h1>Decision Trees</h1>
                    {this.renderTrees()}
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
    setSelecteTree: PropTypes.func.isRequired,
    setAdminView: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	trees: state.tree.data,
    selectedTree: state.tree.selectedTree,
    aView: state.app.adminView
})
const mapDispatchToProps = dispatch => ({
	setSelectedTree: (tree) => dispatch(setSelectedTree(tree)),
    setAdminView: (view) => dispatch(setAdminView(view))
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin)