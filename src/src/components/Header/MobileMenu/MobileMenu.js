import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { BurgerMobileMenu } from './BurgerMenu'
import { LinkMobileMenu } from './LinksMobileMenu'
import css from '../Header.css'

class MobileMenu extends React.PureComponent {
  static propTypes = {
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
        <BurgerMobileMenu
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

  render() {
    const { shouldRenderNewMenuDesign, isAuthenticated, trackNavigationClick } = this.props

    return (
      <span className={css.linkMobileContainer}>
        {
          shouldRenderNewMenuDesign ?
            <LinkMobileMenu isAuthenticated={isAuthenticated} trackNavigationClick={trackNavigationClick} customerLogin={this.customerLogin} />
            : this.renderBurgerMenu()
        }
      </span>
    )
  }
}

export { MobileMenu }
