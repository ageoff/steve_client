import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { navAdminPage, navDecisionPage } from '../lib/nav'

class Entry extends React.Component {
	render() {
        return (
            <div>
                <p>Entry Page</p>
                <p onClick={navAdminPage}>Admin Page</p>
                <p onClick={navDecisionPage}>Decision Page</p>
            </div>
        )
	}
}
Entry.propTypes = {
	
}
const mapStateToProps = state => ({
	
})
const mapDispatchToProps = dispatch => ({
	
})
export default connect(mapStateToProps, mapDispatchToProps)(Entry)