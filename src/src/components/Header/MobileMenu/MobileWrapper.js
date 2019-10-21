import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MobileMenu from './MobileMenu'
import css from '../Header.css'

const proptypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  hideNav: PropTypes.bool.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  mobileMenuItems: PropTypes.arrayOf({
    name: PropTypes.string,
    url: PropTypes.string,
    clientRouted: PropTypes.bool,
    tracking: PropTypes.string
  }).isRequired,
  hideMobileMenu: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  logoutFunc: PropTypes.func.isRequired,
  showMobileMenu: PropTypes.func.isRequired,
  promoCodeUrl: PropTypes.string.isRequired,
  trackNavigationClick: PropTypes.func.isRequired,
  serverError: PropTypes.bool.isRequired,
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

  render() {
    return (
      <span className={css.linkMobileContainer}>
        {this.renderBurgerMenu()}
      </span>
    )
  }
}

MobileWrapper.propTypes = proptypes

export { MobileWrapper }
