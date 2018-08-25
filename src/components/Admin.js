import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Admin extends React.Component {
	render() {
        return (<p>Admin Page</p>)
	}
}
Admin.propTypes = {
	
}
const mapStateToProps = state => ({
	
})
const mapDispatchToProps = dispatch => ({
	
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin)