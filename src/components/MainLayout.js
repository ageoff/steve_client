import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'

import styles from '../assets/css/style.css'
import another from '../App.css'
import { keyToPath, pathToKey, content, showHeader, showEventComponents } from '../lib/routeFunc'
import { routeTable } from '../lib/routeTable'
import { setRouteLocation } from '../redux/user'

const { Content, Footer, Sider } = Layout
const MenuItem = Menu.Item

class MainLayout extends React.Component {
	render() {
		const { location, onChangePage } = this.props
		const nav = routeTable.filter(r => r.inSideNav)
		const copyYear = (new Date()).getFullYear()
		return (
			<Layout className={styles.mainLayout}>
				<Sider
					breakpoint="md"
					collapsedWidth="0"
					className={styles.sideNavContainer}>
					<div className={styles.menuLogo}>
						<p>Logo</p>
					</div>
					<Menu
						theme={'dark'}
						onClick={onChangePage}
						selectedKeys={[pathToKey(location.pathname)]}
						mode="inline"
					>
						{nav.map((p) => (
							<MenuItem className={styles.menuItem} key={p.key}>
								<Icon type={p.icon} />
								<span>{p.title}</span>
							</MenuItem>
						))}
						{/*<MenuItem className={styles.minorMenuItem} key="LOGOUT">
                            <Icon type="logout" />
                            <span>Logout</span>
                        </MenuItem>*/}
					</Menu>
				</Sider>
				<Layout className={styles.innerLayout}>
					<Content className={styles.content}>
						{content(location)}
					</Content>
					<Footer className={styles.footer}>
                        Steve Client ©{copyYear}
					</Footer>
				</Layout>
			</Layout>
		)
	}
}
MainLayout.propTypes = {
	location: PropTypes.object.isRequired,
	onChangePage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	location: state.user.location
})
const mapDispatchToProps = dispatch => ({
	onChangePage: (e) => {

		dispatch(setRouteLocation({pathname: keyToPath(e.key), search: '', hash: ''}))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
