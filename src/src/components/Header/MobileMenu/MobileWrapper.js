import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'Link'
import Svg from 'Svg'
import MobileMenu from './MobileMenu'
import { defaultMenuItems } from '../menuItemsHelper'
import css from '../Header.css'
import cssMobile from './MobileMenu.css'

const proptypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  hideNav: PropTypes.bool.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  mobileMenuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    clientRouted: PropTypes.bool,
    tracking: PropTypes.string
  })).isRequired,
  hideMobileMenu: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  logoutFunc: PropTypes.func.isRequired,
  showMobileMenu: PropTypes.func.isRequired,
  promoCodeUrl: PropTypes.string.isRequired,
  trackNavigationClick: PropTypes.func.isRequired,
  serverError: PropTypes.bool.isRequired,
  shouldRenderNewMenuDesign: PropTypes.bool.isRequired,
}

class MobileWrapper extends React.PureComponent {

  renderBurgerMenu = () => {
    const {
      isAuthenticated,
      hideNav,
      mobileMenuOpen,
      mobileMenuItems,
      hideMobileMenu,
      onOpen,
      logoutFunc,
      showMobileMenu,
      promoCodeUrl,
      trackNavigationClick,
      serverError
    } = this.props

    return (
      <span>
        <MobileMenu
          menuItems={mobileMenuItems}
          show={mobileMenuOpen}
          onHide={hideMobileMenu}
          hideNav={hideNav}
          isAuthenticated={isAuthenticated}
          loginFunc={onOpen}
          logoutFunc={logoutFunc}
          promoCodeUrl={promoCodeUrl}
          trackNavigationClick={trackNavigationClick}
        />
        <button
          type='button'
          className={classNames([css.burgerIcon, 'needsclick'])}
          onClick={showMobileMenu}
          href={serverError ? '#mobileMenu' : null}
          data-testing="burgerMenu"
        />
      </span>
    )
  }
  customerLogin = (e) => {
    const { onOpen, trackNavigationClick } = this.props
    trackNavigationClick('New Login Clicked')
    onOpen(e)
  }

  renderNewMenuDesign = () => {
    const { isAuthenticated, trackNavigationClick } = this.props

    return (
      <span className={cssMobile.mobileMenuTestWrapper}>
        <Svg fileName="icon_menubar_account_link" className={cssMobile.accountIcon} />
        {isAuthenticated ?
          <Link
            to={defaultMenuItems.myGousto.url}
            className={cssMobile.accountMenuItem}
            clientRouted={defaultMenuItems.myGousto.clientRouted}
            tracking={() => trackNavigationClick('New ' + defaultMenuItems.myGousto.tracking)}
          >
            Account
          </Link> :
          <button type="button" className={cssMobile.accountMenuItem} onClick={this.customerLogin}>Log in</button>
        }
        <Svg fileName="icon_menubar_help_link" className={cssMobile.accountIcon} />
        <Link
          to={defaultMenuItems.faq.url}
          className={cssMobile.helpMenuItem}
          clientRouted={defaultMenuItems.faq.clientRouted}
          tracking={() => trackNavigationClick('New ' + defaultMenuItems.faq.tracking)}
          target="_blank"
          rel='noopener noreferrer'
        >
          {defaultMenuItems.faq.name}
        </Link>
      </span>
    )
  }

  render() {
    const { shouldRenderNewMenuDesign } = this.props

    return (
      <span className={css.linkMobileContainer}>
        {shouldRenderNewMenuDesign ? this.renderNewMenuDesign() : this.renderBurgerMenu()}
      </span>
    )
  }
}

MobileWrapper.propTypes = proptypes

export { MobileWrapper }
