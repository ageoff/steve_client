import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//import styles from './containers/styles/appDemoStyles.css'
import { keyToPath, content, showHeader, showEventComponents } from '../lib/routeFunc'
import { setRouteLocation } from '../redux/user'

class MainLayout extends React.Component {
	render() {
		const { location } = this.props
        console.log(location)
        return content(location)
	}
}
MainLayout.propTypes = {
	location: PropTypes.object.isRequired,
	onChangePage: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
	location: state.user.location,
})
const mapDispatchToProps = dispatch => ({
	onChangePage: (e) => {
		
		dispatch(setRouteLocation({pathname: keyToPath(e.key), search: '', hash: ''}))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)