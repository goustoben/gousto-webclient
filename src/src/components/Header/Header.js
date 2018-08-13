import React from 'react'
import classNames from 'classnames'
import Immutable from 'immutable'
import css from './Header.css'
import config from 'config'
import Svg from 'Svg'
import MobileMenu from './MobileMenu'
import Link from 'Link'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import Login from 'Login'
import SimpleHeader from 'Header/SimpleHeader'
import PromoModal from 'PromoModal'
import DuplicateOrderModal from 'DuplicateOrderModal'
import SubscriptionPause from 'routes/Account/Subscription/SubscriptionPause'
import Account from 'routes/Account/Account'
import CancelOrderModal from 'CancelOrderModal'
import ExpiredBillingModal from 'ExpiredBillingModal'

const clientRoutes = config.routes.client

class Header extends React.PureComponent {

	static propTypes = {
		logoutUser: React.PropTypes.func,
		serverError: React.PropTypes.bool.isRequired,
		isAuthenticated: React.PropTypes.bool.isRequired,
		loginOpen: React.PropTypes.bool,
		routing: React.PropTypes.object,
		simple: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		path: React.PropTypes.string,
		fromJoin: React.PropTypes.bool,
		promoCodeUrl: React.PropTypes.string,
		loginVisibilityChange: React.PropTypes.func,
		features: React.PropTypes.instanceOf(Immutable.Map),
		noContactBar: React.PropTypes.bool,
		title: React.PropTypes.string,
		small: React.PropTypes.bool,
	}

	static defaultProps = {
		serverError: false,
		isAuthenticated: false,
		simple: false,
		path: '',
		promoCodeUrl: '',
		title: '',
		small: false,
		features: Immutable.Map({}),
	}

	constructor(props) {
		super(props)

		this.state = {
			mobileMenuOpen: false,
			loginPending: false,
			logoutPending: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
			if (nextProps.isAuthenticated) {
				this.setState({ loginPending: true })
			} else {
				this.setState({ logoutPending: true })
			}
		}
	}

	componentDidUpdate() {
		if (this.state.loginPending) {
			window.setTimeout(() => {
				this.setState({ loginPending: false })
			}, 1000)
		}
		if (this.state.logoutPending) {
			window.setTimeout(() => {
				this.setState({ logoutPending: false })
			}, 1000)
		}
	}

	onClose = () => {
		this.props.loginVisibilityChange(false)
		this.setState({ loginPending: false })
	}

	onCloseCancelBoxModal = () => {
		this.props.closeBoxModalVisibilityChange(false)
	}

	onOpen = (e) => {
		e.stopPropagation()
		this.props.loginVisibilityChange(true)
	}

	getMenuItems = (device, path) => {
		const isAuthenticated = this.props.isAuthenticated

		const home = { name: 'Home', icon: 'home', url: clientRoutes.home, clientRouted: true }

		const availableItems = {
			home,
			boxPrices: { name: 'Box Prices', url: clientRoutes.boxPrices, icon: 'box', clientRouted: true },
			menu: { name: 'Choose Recipes', url: clientRoutes.menu, icon: 'menu' },
			faq: { name: 'Help', url: clientRoutes.help, icon: 'faq', clientRouted: false },
			myGousto: { name: 'My Gousto', url: clientRoutes.myGousto, icon: 'box', clientRouted: false },
			referFriend: { name: 'Free Food', url: clientRoutes.referFriend, icon: 'heart', clientRouted: false },
		}

		let pathLocal = path
		if (path.indexOf('/') === -1) {
			pathLocal = `/${pathLocal}`
		}
		Object.keys(availableItems).forEach(menuItem => {
			if (pathLocal.indexOf(availableItems[menuItem].url) > -1) {
				availableItems[menuItem].disabled = true
			}
		})

		const homeMenuItem = availableItems.home
		if (this.props.promoCodeUrl) {
			homeMenuItem.url = `/${this.props.promoCodeUrl}`
		} else if (path.includes('check-out')) {
			homeMenuItem.url = clientRoutes.menu
		} else if (path.includes('join') || this.props.fromJoin === 'join') {
			homeMenuItem.url = clientRoutes.join
		}

		const items = [
			(isAuthenticated ? availableItems.referFriend : availableItems.boxPrices),
			availableItems.menu,
			availableItems.faq,
		]

		return (device === 'mobile') ? [homeMenuItem].concat(items) : items
	}

	handleQuery = () => {
		let route = ''
		let fromWizard = false
		const routing = this.props.routing
		if (routing && routing.locationBeforeTransitions) {
			if (routing.locationBeforeTransitions.pathname) {
				route = routing.locationBeforeTransitions.pathname
			}
			if (routing.locationBeforeTransitions.query && routing.locationBeforeTransitions.query.from_wizard) {
				fromWizard = true
			}
		}
		const path = this.props.path || route

		return { fromWizard, path }
	}

	logoutFunc = () => {
		this.props.logoutUser()
	}

	showMobileMenu = () => {
		this.setState({ mobileMenuOpen: true })
	}

	hideMobileMenu = () => {
		this.setState({ mobileMenuOpen: false })
	}

	renderAuthLink = () => {
		const { isAuthenticated } = this.props
		const { logoutPending } = this.state
		let buttonState
		let button

		if (logoutPending) {
			buttonState = 'loggingOut'
			button = (
				<a className={css.btn}>
					You're logged out <span className={css.confirm} />
				</a>
			)
		} else if (isAuthenticated) {
			buttonState = 'loggedIn'
			button = (
				<a
					className={css.btn}
					href={clientRoutes.myGousto}
					data-testing="myGoustoButtonLink"
				>
					My Gousto
				</a>
			)
		} else {
			buttonState = 'loggedOut'
			button = (
				<a className={css.btn}>
					Login
				</a>
			)
		}
		const logoutLink = (
			<span
				className={css.linkDesktop}
				onClick={this.logoutFunc}
				data-testing="logoutButton"
			>
				Logout
			</span>
		)

		return (
			<span
				className={classNames(css.authButtonsContainer, css[buttonState])}
				data-testing="loginButton"
				onClick={e => { if (!isAuthenticated) { this.onOpen(e) } }}
			>
				{button}
				{isAuthenticated && logoutLink}
			</span>
		)
	}
	renderMenuItems = (menu, show) => (
		(show) ? menu.map(menuItem => {
			if (menuItem.disabled) {
				return <span key={menuItem.name} className={css.linkDesktopDisabled}>{menuItem.name}</span>
			}

			return <Link key={menuItem.name} to={menuItem.url} className={css.linkDesktop}>{menuItem.name}</Link>
		}) : ''
	)
	render() {
		const { fromWizard, path } = this.handleQuery()
		const joinPage = path.indexOf('join') > -1 || this.props.fromJoin
		const hideNav = fromWizard || joinPage || this.props.disabled || false
		const noContactBar = joinPage || this.props.noContactBar
		if (this.props.simple && !this.props.isAuthenticated) {
			return (
				<SimpleHeader
					serverError={this.props.serverError}
					className={this.state.mobileMenuOpen ? css.overlayOpen : css.overlay}
					homeUrl={this.getMenuItems('mobile', path)[0].url}
					noContactBar={noContactBar}
					title={this.props.title}
					small={this.props.small}
				/>
			)
		}

		return (
			<span id={this.props.serverError ? 'mobileMenu' : null} data-testing="header">
				<a
					className={this.state.mobileMenuOpen ? css.overlayOpen : css.overlay}
					href={this.props.serverError ? '#' : null}
					onClick={this.hideMobileMenu}
				/>
				<header className={noContactBar ? css.headerNoContactBar : css.header}>
					<div>
						<MobileMenu
							menuItems={this.getMenuItems('mobile', path)}
							show={this.state.mobileMenuOpen}
							onHide={this.hideMobileMenu}
							hideNav={hideNav}
							isAuthenticated={this.props.isAuthenticated}
							loginFunc={this.onOpen}
							logoutFunc={this.logoutFunc}
							promoCodeUrl={this.props.promoCodeUrl}
						/>
						<div className={css.container}>
							{(!noContactBar) ? <div className={css.contactBar}>
								<p className={css.contactContent}>
									<span className={css.info}>Free delivery </span>
									<span className={css.info}>{config.company.telephone.number}</span>
								</p>
							</div> : null}
							<div className={css.mainBar}>
								<div className={css.mainContent}>
									<Link to={this.getMenuItems('mobile', path)[0].url} clientRouted={this.getMenuItems('mobile', path)[0].clientRouted && !Boolean(this.props.promoCodeUrl)} className={css.logoLink}>
										<span>
											<Svg fileName="icon-logo" className={css.logoDesktop} />
											<Svg fileName="icon-logo-g" className={css.logoMobile} />
										</span>
									</Link>
									{(path === '/menu') ? <span className={css.menuTitle}>Choose Recipes</span> : ''}
									<span className={css.linkDesktopContainer}>
										{(!hideNav) ? this.getMenuItems('desktop', path).map(menuItem => {
											if (menuItem.disabled) {
												return (
													<span
														key={menuItem.name}
														className={classNames(css.linkDesktop, css.disabled)}
													>
														{menuItem.fullWidthPrefix && <span className={css.fullWidthPrefix}>{menuItem.fullWidthPrefix}</span>}
														{menuItem.name}
													</span>
												)
											}

											return (
												<Link
													key={menuItem.name}
													to={menuItem.url}
													className={css.linkDesktop}
													clientRouted={menuItem.clientRouted}
												>
													{menuItem.fullWidthPrefix && <span className={css.fullWidthPrefix}>{menuItem.fullWidthPrefix}</span>}
													{menuItem.name}
												</Link>
											)
										}) : ''}
										{this.renderAuthLink()}
									</span>
									<span className={css.linkMobileContainer}>
										<a className={classNames([css.burgerIcon, 'needsclick'])} onClick={this.showMobileMenu} href={this.props.serverError ? '#mobileMenu' : null} data-testing="burgerMenu" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<Overlay open={Boolean(this.props.loginOpen)} className={css.mobileOverlay} contentClassName={css.mobileModalContent} from="top">
					<ModalPanel closePortal={this.onClose} className={css.modal} containerClassName={css.modalContainer} disableOverlay>
						<Login isAuthenticated={this.props.isAuthenticated} isOpen={this.props.loginOpen} isPending={this.state.loginPending} />
					</ModalPanel>
				</Overlay>
				<CancelOrderModal close={this.onCloseCancelBoxModal} />
				<PromoModal />
				<DuplicateOrderModal />
				<ExpiredBillingModal />
				<SubscriptionPause />
				{this.props.path.indexOf('my-') !== -1 ? (<div><Account location={{ pathname: path }} /></div>) : null}
			</span>
		)
	}
}
export default Header
