import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCurrentTree, addSelectedTree, deleteSelectedTree } from '../redux/app'
import styles from '../assets/css/style.css'

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
        return parent
    }
    renderNodes(node) {
        const { setCurrentTree, addSelectedTree } = this.props
        let crumb = [...this.getBreadcrumb(node.id)]
        return (
            <div>
                <div className={styles.inlineCrumb}>
                    <span className={styles.crumbSelectable} onClick={()=>setCurrentTree('')}>{'Home'}</span>
                    {crumb.map((c, i) => (
                        <span><span className={styles.crumbText}>{' -> '}</span><span className={styles.crumbSelectable} onClick={()=>setCurrentTree(c.id)}>{c.name}</span></span>
                    ))}
                </div>
                {node.nodes.map(n => (
                    <div className={styles.nodeSelectable} onClick={()=>{
                        if (n.nodes.length == 0) {
                            addSelectedTree(n.id)
                            setCurrentTree('')
                        }
                        else {
                            setCurrentTree(n.id)
                        }
                    }}>
                        <div className={styles.nodeLeft}><p className={styles.nodeText}>{n.name}</p></div>
                        {n.average != null && <div className={styles.nodeRight}><p className={styles.nodeTest}>{'National Average: $'+(n.average||0).formatMoney()}</p></div>}
                    </div>
                ))}
            </div>
        )
    }

    renderCurrentTree() {
        const { trees, currentTree, setCurrentTree } = this.props
        if (currentTree === '') {
            return trees.map(t => (
                <div className={styles.nodeSelectable} onClick={()=>setCurrentTree(t.id)}>
                    <p className={styles.nodeText}>{t.name}</p>
                </div>
            ))
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
        let crumb = []
        trees.map(t => {
            const checkChildren = (node, c = []) => {
                c.push({name: node.name, id: node.id})
                if (node.id === id) crumb = c
                node.nodes.map(n => {
                    if (n.id === id) crumb = [...c, {name: n.name, id: n.id}]
                    else checkChildren(n, [...c])
                })
            }
            checkChildren(t)
        })
        return crumb
    }

    getCost(id) {
        const { trees } = this.props
        let cost = 0
        trees.map(t => {
            const checkChildren = (node) => {
                node.nodes.map(n => {
                    if (n.id === id) cost = n.average || 0
                    else checkChildren(n)
                })
            }
            if (t.id === id) cost = n.average || 0
            else checkChildren(t)
        })
        return cost
    }

	render() {
        const { trees, currentTree, selectedTrees } = this.props
        let total = 0
        selectedTrees.map(id=>{
            total+=this.getCost(id)
        })
        Number.prototype.formatMoney = function(c, d, t){
            var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
           return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
         };
        return (
            <div>
                <p className={styles.pageTitle}>{'Report Builders'}</p>
                <div className={styles.pickerContainer}>
                    <p className={styles.sectionTitle}>{'Item Picker'}</p>
                    {this.renderCurrentTree()}
                </div>
                <div className={styles.breadcrumbContainer}>
                    <p className={styles.sectionTitle}>{'Selected Items'}</p>
                    {selectedTrees.length == 0 && <div className={styles.breadContainer}><span className={styles.crumbText}>{'No Items Selected'}</span></div>}
                    {selectedTrees.map(id => (
                        <div className={styles.breadContainer}>
                            <div className={styles.selectedLeft}>
                                {this.getBreadcrumb(id).map((c, i) => (
                                    <span className={styles.crumbText}>{c.name + (i!=(this.getBreadcrumb(id).length-1)? ' -> ':'')}</span>)
                                )}
                            </div>
                            <div className={styles.selectedRight}>
                                <p className={styles.crumbText}>{'$'+this.getCost(id).formatMoney()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.totalContainer}>
                    <p className={styles.totalTextLeft}>{'Total: '}</p>
                    <p className={styles.totalTextRight}>{'$' + total.formatMoney()}</p>
                </div>
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
