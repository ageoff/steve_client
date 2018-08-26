import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCurrentTree, addSelectedTree, deleteSelectedTree } from '../redux/app'

class Decision extends React.Component {
    getParentNode(id) {
        const { trees } = this.props
        let parent = ''
        trees.map(t => {
            const checkChildren = (node) => {
                node.nodes.map(n => {
                    if (n.id == id) parent = node.id
                    else checkChildren(n)
                })
            }
            checkChildren(t)
        })
        console.log('Parent id: ' + parent)
        return parent
    }
    renderNodes(node) {
        const { setCurrentTree, addSelectedTree } = this.props
        return (
            <div>
                <p onClick={()=>setCurrentTree(this.getParentNode(node.id))}>{node.name}</p>
                {node.nodes.map(n => (
                    <p onClick={()=>{
                        if (n.nodes.length == 0) {
                            addSelectedTree(n.id)
                            setCurrentTree('')
                        }
                        else {
                            setCurrentTree(n.id)
                        }
                    }}>{n.name}</p>
                ))}
            </div>
        )
    }

    renderCurrentTree() {
        const { trees, currentTree, setCurrentTree } = this.props
        if (currentTree === '') {
            return trees.map(t => (<p onClick={()=>setCurrentTree(t.id)}>{t.name}</p>))
        }
        else {
            let node = null
            const checkNodes = (n) => {
                if (n.id === currentTree) return node = n
                else n.nodes.map(j => checkNodes(j))
            }
            trees.map(t => {
                checkNodes(t)
            })
            return this.renderNodes(node)
        }
    }

    getBreadcrumb(id) {
        const { trees } = this.props
        console.log('Getting the crumb')
        let crumb = []
        trees.map(t => {
            const checkChildren = (node, c = []) => {
                c.push(node.name)
                node.nodes.map(n => {
                    if (n.id === id) crumb = [...c, n.name]
                    else checkChildren(n, [...c])
                })
            }
            checkChildren(t)
        })
        console.log('Crumb: ')
        console.log(crumb)
        return crumb
    }

	render() {
        const { trees, currentTree, selectedTrees } = this.props
        return (
            <div>
                <h1>{'Pick entries'}</h1>
                {this.renderCurrentTree()}
                {selectedTrees.map(id => (
                    <div>
                        {this.getBreadcrumb(id).map(c => (<span>{c+'=>'}</span>))}
                    </div>
                ))}
            </div>
        )
	}
}
Decision.propTypes = {
    trees: PropTypes.array.isRequired,
    currentTree: PropTypes.string.isRequired,
    selectedTrees: PropTypes.array.isRequired,
    //Fuctions
    setCurrentTree: PropTypes.func.isRequired,
    addSelectedTree: PropTypes.func.isRequired,
    deleteSelectedTree: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	trees: state.tree.data,
    currentTree: state.app.currentTree,
    selectedTrees: state.app.selectedTrees
})
const mapDispatchToProps = dispatch => ({
	setCurrentTree: (id) => dispatch(setCurrentTree(id)),
    addSelectedTree: (id) => dispatch(addSelectedTree(id)),
    deleteSelectedTree: (id) => dispatch(deleteSelectedTree(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Decision)
