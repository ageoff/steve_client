import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Decision extends React.Component {
	render() {
		
        return (<p>Decision Page</p>)
	}
}
Decision.propTypes = {
	
}
const mapStateToProps = state => ({
	
})
const mapDispatchToProps = dispatch => ({
	
})
export default connect(mapStateToProps, mapDispatchToProps)(Decision)