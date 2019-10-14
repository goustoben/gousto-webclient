import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import config from 'config'
import Svg from 'Svg'
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
import CookieBanner from 'CookieBanner'
import { AppBanner } from 'AppBanner'
import { AbandonBasketModal } from 'AbandonBasketModal'
import { OnScreenRecovery } from 'routes/Account/MyDeliveries/OrdersList/OnScreenRecovery'
import { onEnter } from 'utils/accessibility'
import MobileMenu from './MobileMenu'
import css from './Header.css'

const clientRoutes = config.routes.client

class Header extends React.PureComponent {

  static propTypes = {
    logoutUser: PropTypes.func,
    serverError: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loginOpen: PropTypes.bool,
    routing: PropTypes.object,
    simple: PropTypes.bool,
    disabled: PropTypes.bool,
    path: PropTypes.string,
    fromJoin: PropTypes.bool,
    promoCodeUrl: PropTypes.string,
    loginVisibilityChange: PropTypes.func,
    closeBoxModalVisibilityChange: PropTypes.func,
    title: PropTypes.string,
    small: PropTypes.bool,
    forceSignupWizardFeature: PropTypes.bool,
    abandonBasketFeature: PropTypes.bool,
    trackNavigationClick: PropTypes.func,
    shouldLoadOrders: PropTypes.bool,
    loadUserOrders: PropTypes.func.isRequired,
  }

  static defaultProps = {
    serverError: false,
    isAuthenticated: false,
    simple: false,
    path: '',
    promoCodeUrl: '',
    title: '',
    small: false,
    trackNavigationClick: () => { },
    abandonBasketFeature: false,
    shouldLoadOrders: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      mobileMenuOpen: false,
      loginPending: false,
      logoutPending: false,
    }
  }

  componentDidMount() {
    const { loadUserOrders, shouldLoadOrders } = this.props
    if (shouldLoadOrders) {
      loadUserOrders()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated } = this.props
    if (isAuthenticated !== nextProps.isAuthenticated) {
      if (nextProps.isAuthenticated) {
        this.setState({ loginPending: true })
      } else {
        this.setState({ logoutPending: true })
      }
      this.hideMobileMenu()
    }
  }

  componentDidUpdate() {
    const { loginPending, logoutPending } = this.state
    if (loginPending) {
      window.setTimeout(() => {
        this.setState({ loginPending: false })
      }, 1000)
    }
    if (logoutPending) {
      window.setTimeout(() => {
        this.setState({ logoutPending: false })
      }, 1000)
    }
  }

  onClose = () => {
    const { loginVisibilityChange } = this.props
    loginVisibilityChange(false)
    this.setState({ loginPending: false })
  }

  onCloseCancelBoxModal = () => {
    const { closeBoxModalVisibilityChange } = this.props
    closeBoxModalVisibilityChange(false)
  }

  onOpen = (e) => {
    const { loginVisibilityChange } = this.props
    e.stopPropagation()
    loginVisibilityChange(true)
  }

  getChooseRecipesLink = () => {
    const { forceSignupWizardFeature, isAuthenticated } = this.props

    return forceSignupWizardFeature && !isAuthenticated ? clientRoutes.signup : clientRoutes.menu
  }

  getMenuItems = (device, path) => {
    const { isAuthenticated, promoCodeUrl, fromJoin } = this.props

    const home = { name: 'Home', url: clientRoutes.home, clientRouted: true }

    const availableItems = {
      home,
      boxPrices: { name: 'Box Prices', url: clientRoutes.boxPrices, clientRouted: true, tracking: 'BoxPricingNavigation Clicked' },
      menu: { name: 'Choose Recipes', url: this.getChooseRecipesLink(), tracking: 'RecipeNavigation Clicked' },
      faq: {
        name: 'Help',
        url: config.routes.zendesk.faqs,
        clientRouted: false,
        tracking: 'FAQNavigation Clicked'
      },
      myGousto: { name: 'My Gousto', url: clientRoutes.myGousto, clientRouted: false, tracking: 'MyGoustoNavigation Clicked' },
      referFriend: { name: 'Free Food', url: clientRoutes.referFriend, clientRouted: false, tracking: 'ReferAFriendNavigation Clicked' },
      rateMyRecipes: { name: 'Rate My Recipes', url: clientRoutes.rateMyRecipes, clientRouted: false, tracking: 'RateMyRecipesNavigation Clicked' },
      deliveries: { name: 'Deliveries', url: clientRoutes.myDeliveries, clientRouted: false, tracking: 'DeliveriesNavigation Clicked' },
      subscription: { name: 'Subscription', url: clientRoutes.mySubscription, clientRouted: false, tracking: 'SubscriptionNavigation Clicked' },
      details: { name: 'Details', url: clientRoutes.myDetails, clientRouted: false, tracking: 'DetailsNavigation Clicked' },
      sustainability: { name: 'Sustainability', url: clientRoutes.weCare, clientRouted: false, tracking: 'SustainabilityNavigation Clicked' },
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
    if (promoCodeUrl) {
      homeMenuItem.url = `/${promoCodeUrl}`
    } else if (path.includes('check-out')) {
      homeMenuItem.url = clientRoutes.menu
    } else if (path.includes('join') || fromJoin === 'join') {
      homeMenuItem.url = clientRoutes.join
    }

    const desktopItems = [
      !isAuthenticated && availableItems.boxPrices,
      availableItems.menu,
      isAuthenticated && availableItems.referFriend,
      availableItems.sustainability,
      availableItems.faq,
    ].filter(item => item)

    const mobileItems = [
      !isAuthenticated && availableItems.boxPrices,
      availableItems.menu,
      availableItems.sustainability,
      availableItems.faq,
    ].filter(item => item)

    const myGousto = [availableItems.myGousto]
    const rateMyRecipes = [availableItems.rateMyRecipes]
    const deliveries = [availableItems.deliveries]
    const subscription = [availableItems.subscription]
    const details = [availableItems.details]
    const referFriend = [availableItems.referFriend]

    let mobileMenu = []

    if (isAuthenticated) {
      mobileMenu = myGousto.concat(deliveries, subscription, details, referFriend, rateMyRecipes, homeMenuItem, mobileItems)
    } else {
      mobileMenu = mobileMenu.concat(homeMenuItem, mobileItems)
    }

    return (device === 'mobile') ? mobileMenu : desktopItems
  }

  handleQuery = () => {
    let route = ''
    let fromWizard = false
    const { routing, path } = this.props
    if (routing && routing.locationBeforeTransitions) {
      if (routing.locationBeforeTransitions.pathname) {
        route = routing.locationBeforeTransitions.pathname
      }
      if (routing.locationBeforeTransitions.query && routing.locationBeforeTransitions.query.from_wizard) {
        fromWizard = true
      }
    }
    const newPath = path || route

    return { fromWizard, newPath }
  }

  logoutFunc = () => {
    const { logoutUser } = this.props
    logoutUser()
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
        <button type="button" className={css.btn}>
          You&#8217;re logged out <span className={css.confirm} />
        </button>
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
        <button type="button" className={css.btn} data-testing="loginButton">
          Login
        </button>
      )
    }
    const logoutLink = (
      <span
        role="button"
        tabIndex='0'
        className={css.linkDesktop}
        onClick={this.logoutFunc}
        onKeyDown={e => onEnter(e, this.logoutFunc)}
        data-testing="logoutButton"
      >
        Logout
      </span>
    )

    return (
      <span
        role='button'
        tabIndex='0'
        className={classNames(css.authButtonsContainer, css[buttonState])}
        onClick={e => { if (!isAuthenticated) { this.onOpen(e) } }}
        onKeyDown={e => onEnter(e, () => { if (!isAuthenticated) { this.onOpen() } })}
      >
        {button}
        {isAuthenticated && logoutLink}
      </span>
    )
  }

  renderMenuItems = (menu, hideNav) => {
    const { trackNavigationClick } = this.props

    if (hideNav) {
      return null
    }

    return menu.map(menuItem => {
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

      const openNewTab = menuItem.name === 'Help'

      return (
        <Link
          key={menuItem.name}
          to={menuItem.url}
          className={css.linkDesktop}
          clientRouted={menuItem.clientRouted}
          tracking={() => trackNavigationClick(menuItem.tracking)}
          target={openNewTab ? '_blank' : null}
          rel={openNewTab ? 'noopener noreferrer' : null}
        >
          {menuItem.fullWidthPrefix && <span className={css.fullWidthPrefix}>{menuItem.fullWidthPrefix}</span>}
          {menuItem.name}
        </Link>
      )
    })
  }

  render() {
    const {
      fromJoin,
      disabled,
      simple,
      isAuthenticated,
      serverError,
      title,
      small,
      promoCodeUrl,
      loginOpen,
      path,
      trackNavigationClick,
      abandonBasketFeature,
    } = this.props

    const { mobileMenuOpen, loginPending } = this.state
    const { fromWizard } = this.handleQuery()
    const joinPage = path.indexOf('join') > -1 || fromJoin
    const hideNav = fromWizard || joinPage || disabled || false
    const mobileMenuItems = this.getMenuItems('mobile', path)
    const homeElementMobile = mobileMenuItems.find(item => (item.name === 'Home'))
    const desktopMenuItems = this.getMenuItems('desktop', path)
    let hasUserStartedNewSession
    if (__CLIENT__) {
      hasUserStartedNewSession = !!window.sessionStorage.getItem('isNotFirstLoadOfSession') !== true
    }
    const shouldShowAbandonBasketModal = abandonBasketFeature && hasUserStartedNewSession

    if (simple && !isAuthenticated) {
      return (
        <SimpleHeader
          serverError={serverError}
          className={mobileMenuOpen ? css.overlayOpen : css.overlay}
          homeUrl={mobileMenuItems[0].url}
          title={title}
          small={small}
        />
      )
    }

    return (
      <div>
        <CookieBanner />
        <AppBanner />
        {shouldShowAbandonBasketModal ? < AbandonBasketModal /> : null}
        <span id={serverError ? 'mobileMenu' : null} data-testing="header">
          <button
            type="button"
            className={mobileMenuOpen ? css.overlayOpen : css.overlay}
            href={serverError ? '#' : null}
            onClick={this.hideMobileMenu}
          />
          <header className={css.header}>
            <div>
              <MobileMenu
                menuItems={mobileMenuItems}
                show={mobileMenuOpen}
                onHide={this.hideMobileMenu}
                hideNav={hideNav}
                isAuthenticated={isAuthenticated}
                loginFunc={this.onOpen}
                logoutFunc={this.logoutFunc}
                promoCodeUrl={promoCodeUrl}
                trackNavigationClick={trackNavigationClick}
              />
              <div className={css.container}>
                <div className={css.mainBar}>
                  <div className={css.mainContent}>
                    <Link to={homeElementMobile.url} clientRouted={homeElementMobile.clientRouted && !Boolean(promoCodeUrl)} className={css.logoLink}>
                      <span>
                        <Svg fileName="gousto_logo" className={css.logoDesktop} />
                      </span>
                    </Link>
                    {(path === '/menu') ? <span className={css.menuTitle}>Choose Recipes</span> : ''}
                    <span className={css.linkDesktopContainer}>
                      {this.renderMenuItems(desktopMenuItems, hideNav)}
                      {this.renderAuthLink()}
                    </span>
                    <span className={css.linkMobileContainer}>
                      <button
                        type='button'
                        className={classNames([css.burgerIcon, 'needsclick'])}
                        onClick={this.showMobileMenu}
                        href={serverError ? '#mobileMenu' : null}
                        data-testing="burgerMenu"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <Overlay open={Boolean(loginOpen)} className={css.mobileOverlay} contentClassName={css.mobileModalContent} from="top">
            <ModalPanel closePortal={this.onClose} className={css.modal} containerClassName={css.modalContainer} disableOverlay>
              <Login isAuthenticated={isAuthenticated} isOpen={loginOpen} isPending={loginPending} />
            </ModalPanel>
          </Overlay>
          <CancelOrderModal close={this.onCloseCancelBoxModal} />
          <PromoModal />
          <DuplicateOrderModal />
          <ExpiredBillingModal />
          <SubscriptionPause />
          <OnScreenRecovery />
          {path.indexOf('my-') !== -1 ? (<div><Account location={{ pathname: path }} /></div>) : null}
        </span>
      </div>
    )
  }
}
export { Header }
