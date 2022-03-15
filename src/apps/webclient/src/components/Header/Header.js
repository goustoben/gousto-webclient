import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { client } from 'config/routes'
import Svg from 'Svg'
import Link from 'Link'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import { Login } from 'Login'
import { SimpleHeader } from 'Header/SimpleHeader'
import { PromoModalWrapper as PromoModal } from 'PromoModal'
import { DuplicateOrderModalWrapperContainer } from 'DuplicateOrderModal'
import SubscriptionPause from 'routes/Account/Subscription/SubscriptionPause'
import Account from 'routes/Account/Account'
import { CancelOrderModalContainer } from 'CancelOrderModal'
import { ExpiredBillingModalContainer } from 'ExpiredBillingModal'
import { CookieBannerContainer } from 'CookieBanner'
import { Button } from 'goustouicomponents'
import { AppBanner } from 'AppBanner'
import { AbandonBasketModal } from 'AbandonBasketModal'
import { OnScreenRecovery } from 'routes/Account/MyDeliveries/OrdersList/OnScreenRecovery'
import { onEnter } from 'utils/accessibility'
import { canUseWindow } from 'utils/browserEnvironment'
import * as trackingKeys from 'actions/trackingKeys'
import { MobileMenu } from './MobileMenu'
import { getDeepClonedMenuItems } from './menuItemsHelper'
import css from './Header.css'

class Header extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mobileMenuOpen: false,
      loginPending: false,
      logoutPending: false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  componentDidUpdate(prevProps) {
    const { loginPending, logoutPending } = this.state
    const { isHelpPreLoginOpen, trackHelpPreLoginModalDisplayed } = this.props

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

    if (prevProps.isHelpPreLoginOpen === false && isHelpPreLoginOpen === true) {
      trackHelpPreLoginModalDisplayed()
    }
  }

  showHelpPreLogin = () => {
    const { helpPreLoginVisibilityChange } = this.props
    helpPreLoginVisibilityChange(true)
  }

  onClose = () => {
    const { loginVisibilityChange, helpPreLoginVisibilityChange } = this.props
    helpPreLoginVisibilityChange(false)
    loginVisibilityChange(false)
    this.setState({ loginPending: false })
  }

  onCloseCancelBoxModal = () => {
    const { closeBoxModalVisibilityChange } = this.props
    closeBoxModalVisibilityChange(false)
  }

  onLoginClick = (e) => {
    const { isAuthenticated, loginVisibilityChange } = this.props

    if (!isAuthenticated) {
      e.stopPropagation()
      loginVisibilityChange(true)
    }
  }

  getMenuItems = (device, path) => {
    const { isAuthenticated, promoCodeUrl, fromJoin } = this.props
    const menuItems = getDeepClonedMenuItems()
    let pathLocal = path
    if (path.indexOf('/') === -1) {
      pathLocal = `/${pathLocal}`
    }

    Object.keys(menuItems).forEach(menuItem => {
      const currentMenuItem = menuItems[menuItem]

      if (pathLocal.indexOf(currentMenuItem.url) > -1) {
        currentMenuItem.disabled = true
      }
    })

    const homeMenuItem = { ...menuItems.home }
    if (promoCodeUrl) {
      homeMenuItem.url = `/${promoCodeUrl}`
    } else if (path.includes('check-out')) {
      homeMenuItem.url = client.menu
    } else if (path.includes('join') || fromJoin === 'join') {
      homeMenuItem.url = client.join
    }

    const desktopItems = [
      !isAuthenticated && menuItems.boxPrices,
      menuItems.menu,
      isAuthenticated && menuItems.referFriend,
      menuItems.sustainability,
      menuItems.help,
    ].filter(item => item)

    const mobileItems = [
      !isAuthenticated && menuItems.boxPrices,
      menuItems.menu,
      menuItems.sustainability,
      menuItems.help,
    ].filter(item => item)

    const myGousto = [menuItems.myGousto]
    const rateMyRecipes = [menuItems.rateMyRecipes]
    const deliveries = [menuItems.deliveries]
    const subscription = [menuItems.subscription]
    const details = [menuItems.details]
    const referFriend = [menuItems.referFriend]

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

  onLogoutClick = () => {
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
          You&#8217;re logged out
          <span className={css.confirm} />
        </button>
      )
    } else if (isAuthenticated) {
      buttonState = 'loggedIn'
      button = (
        <Link
          key={client.myGousto}
          to={client.myGousto}
          className={css.btn}
          clientRouted
          data-testing="myGoustoButtonLink"
        >
          My Gousto
        </Link>
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
        tabIndex="0"
        className={css.linkDesktop}
        onClick={this.onLogoutClick}
        onKeyDown={onEnter(this.onLogoutClick)}
        data-testing="logoutButton"
      >
        Logout
      </span>
    )

    return (
      <span
        role="button"
        tabIndex="0"
        className={classNames(css.authButtonsContainer, css[buttonState])}
        onClick={this.onLoginClick}
        onKeyDown={onEnter(this.onLoginClick)}
      >
        {button}
        {isAuthenticated && logoutLink}
      </span>
    )
  }

  renderMenuItems = (menu, hideNav) => {
    const { isAuthenticated, trackNavigationClick } = this.props

    if (hideNav) {
      return null
    }

    const helpNavTrackingData = {
      actionType: trackingKeys.clickHelpNavigation,
      seCategory: 'help',
      logged_in: isAuthenticated,
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

      const isHelpPreloginNeeded = menuItem.name.toLowerCase() === 'help'
      if (isHelpPreloginNeeded && !isAuthenticated) {
        return (
          <span
            key={menuItem.name}
            className={css.linkDesktop}
            data-test="help-link"
            role="button"
            tabIndex="0"
            onClick={() => {
              this.showHelpPreLogin()
              trackNavigationClick(helpNavTrackingData)
            }}
            onKeyDown={onEnter(this.showHelpPreLogin)}
          >
            {menuItem.name}
          </span>
        )
      }

      const isHelpLink = menuItem.name === 'Help'
      const trackingData = isHelpLink ? helpNavTrackingData : { actionType: menuItem.tracking }

      return (
        <Link
          key={menuItem.name}
          data-optimizely={isHelpLink ? 'desktop-header-help-link' : null}
          to={menuItem.url}
          className={css.linkDesktop}
          clientRouted={menuItem.clientRouted}
          tracking={() => trackNavigationClick(trackingData)}
        >
          {menuItem.fullWidthPrefix && <span className={css.fullWidthPrefix}>{menuItem.fullWidthPrefix}</span>}
          {menuItem.name}
        </Link>
      )
    })
  }

  onUseAppClick = () => {
    const { trackNavigationClick } = this.props
    trackNavigationClick({ actionType: 'UseAppHeaderCta Clicked' })
    window.location.assign('/apps')
  }

  renderLoginModal = () => {
    const {
      isHelpPreLoginOpen,
      isLoginOpen,
      showAppAwareness,
      trackContinueAsNewCustomer,
    } = this.props

    return (
      <Overlay
        open={Boolean(isLoginOpen || isHelpPreLoginOpen)}
        contentClassName={css.modalOverlay}
        from="top"
      >
        <ModalPanel
          closePortal={this.onClose}
          className={classNames(css.modal, { [css.appAwarenessModal]: showAppAwareness })}
          containerClassName={css.modalContainer}
          disableOverlay
          isNarrow
        >
          <Login
            title={isHelpPreLoginOpen
              ? 'We can help you faster if you\'re logged in'
              : 'Login' }
          />
          {isHelpPreLoginOpen
            ? (
              <Link
                to={client.helpCentre}
                data-optimizely="new-customer-help-link"
                clientRouted={false}
                className={css.continueAsNewCustomerLink}
                tracking={trackContinueAsNewCustomer}
              >
                Continue as new customer
              </Link>
            )
            : null}
        </ModalPanel>
      </Overlay>
    )
  }

  render() {
    const {
      fromJoin,
      disabled,
      simple,
      isAuthenticated,
      serverError,
      title,
      promoCodeUrl,
      path,
      trackNavigationClick,
      abandonBasketFeature,
      routing,
      isAppAwarenessEnabled,
      showLoginCTA,
      hasLoginModal,
    } = this.props
    const pathName = routing && routing.locationBeforeTransitions && routing.locationBeforeTransitions.pathname
    const { mobileMenuOpen } = this.state
    const { fromWizard } = this.handleQuery()
    const joinPage = path.indexOf('join') > -1 || fromJoin
    const hideNav = fromWizard || joinPage || disabled || false
    const mobileMenuItems = this.getMenuItems('mobile', path)
    const homeElementMobile = mobileMenuItems.find(item => (item.name === 'Home'))
    const desktopMenuItems = this.getMenuItems('desktop', path)
    let hasUserStartedNewSession
    if (canUseWindow()) {
      hasUserStartedNewSession = !!window.sessionStorage.getItem('isNotFirstLoadOfSession') !== true
    }
    const shouldShowAbandonBasketModal = abandonBasketFeature && hasUserStartedNewSession

    if (simple && !isAuthenticated) {
      return (
        <Fragment>
          <SimpleHeader
            serverError={serverError}
            className={mobileMenuOpen ? css.overlayOpen : css.overlay}
            homeUrl={mobileMenuItems[0].url}
            title={title}
            showLoginCTA={showLoginCTA}
            onLoginClick={this.onLoginClick}
          />
          {(showLoginCTA || hasLoginModal) && this.renderLoginModal()}
        </Fragment>
      )
    }

    if (pathName && pathName.includes(client.checkoutWelcome)) {
      return (
        <SimpleHeader
          serverError={serverError}
          className={mobileMenuOpen ? css.overlayOpen : css.overlay}
          homeUrl={mobileMenuItems[0].url}
          title={title}
        />
      )
    }

    return (
      <div>
        <CookieBannerContainer />
        <AppBanner />
        {shouldShowAbandonBasketModal ? <AbandonBasketModal /> : null}
        <span id={serverError ? 'mobileMenu' : null} data-testing="header">
          <button
            type="button"
            className={mobileMenuOpen ? css.overlayOpen : css.overlay}
            href={serverError ? '#' : null}
            onClick={this.hideMobileMenu}
          />
          <header className={css.header}>
            <div className={css.container}>
              <div className={css.mainBar}>
                <div className={css.mainContent}>
                  <Link to={homeElementMobile.url} clientRouted={homeElementMobile.clientRouted && !promoCodeUrl} className={css.logoLink} aria-label="Gousto Home button">
                    <span>
                      <Svg fileName="gousto_logo" className={css.logoDesktop} />
                    </span>
                  </Link>
                  {(path === client.menu) ? <span className={css.menuTitle}>Choose Recipes</span> : ''}
                  <span className={css.linkDesktopContainer}>
                    {this.renderMenuItems(desktopMenuItems, hideNav)}
                    {this.renderAuthLink()}
                  </span>
                  {
                    (isAuthenticated && pathName !== client.menu && !isAppAwarenessEnabled)
                    && <Button color="secondary" className={css.useAppCta} onClick={this.onUseAppClick}>Use App</Button>
                  }
                  <MobileMenu
                    hideMobileMenu={this.hideMobileMenu}
                    onLoginClick={this.onLoginClick}
                    onLogoutClick={this.onLogoutClick}
                    showMobileMenu={this.showMobileMenu}
                    mobileMenuItems={mobileMenuItems}
                    mobileMenuOpen={mobileMenuOpen}
                    hideNav={hideNav}
                    isAuthenticated={isAuthenticated}
                    promoCodeUrl={promoCodeUrl}
                    trackNavigationClick={(trackingData) => {
                      trackNavigationClick(trackingData)
                      this.hideMobileMenu()
                    }}
                    serverError={serverError}
                    shouldRenderAccountLink={isAuthenticated && pathName && (pathName.startsWith('/menu'))}
                  />
                </div>
              </div>
            </div>
          </header>
          {this.renderLoginModal()}
          <CancelOrderModalContainer close={this.onCloseCancelBoxModal} />
          <PromoModal />
          <DuplicateOrderModalWrapperContainer />
          <ExpiredBillingModalContainer />
          <SubscriptionPause />
          <OnScreenRecovery />
          {path.indexOf('my-') !== -1 ? (<div><Account location={{ pathname: path }} /></div>) : null}
        </span>
      </div>
    )
  }
}

Header.propTypes = {
  abandonBasketFeature: PropTypes.bool,
  closeBoxModalVisibilityChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  fromJoin: PropTypes.bool,
  helpPreLoginVisibilityChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isHelpPreLoginOpen: PropTypes.bool,
  isLoginOpen: PropTypes.bool,
  loginVisibilityChange: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  path: PropTypes.string,
  promoCodeUrl: PropTypes.string,
  routing: PropTypes.objectOf(PropTypes.object).isRequired,
  serverError: PropTypes.bool,
  simple: PropTypes.bool,
  title: PropTypes.string,
  trackContinueAsNewCustomer: PropTypes.func,
  trackHelpPreLoginModalDisplayed: PropTypes.func,
  trackNavigationClick: PropTypes.func,
  showAppAwareness: PropTypes.bool,
  isAppAwarenessEnabled: PropTypes.bool,
  showLoginCTA: PropTypes.bool,
  hasLoginModal: PropTypes.bool,
}

Header.defaultProps = {
  abandonBasketFeature: false,
  disabled: false,
  fromJoin: false,
  isAuthenticated: false,
  isHelpPreLoginOpen: false,
  isLoginOpen: false,
  path: '',
  promoCodeUrl: '',
  serverError: false,
  simple: false,
  title: '',
  trackContinueAsNewCustomer: () => {},
  trackHelpPreLoginModalDisplayed: () => {},
  trackNavigationClick: () => { },
  showAppAwareness: false,
  isAppAwarenessEnabled: false,
  showLoginCTA: false,
  hasLoginModal: false,
}

export { Header }
