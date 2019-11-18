import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { BurgerMobileMenu } from './BurgerMenu'
import { LinkMobileMenu } from './LinksMobileMenu'
import css from '../Header.css'

class MobileMenu extends React.PureComponent {
  static propTypes = {
    hideMobileMenu: PropTypes.func.isRequired,
    hideNav: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    mobileMenuItems: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      clientRouted: PropTypes.bool,
      tracking: PropTypes.string
    })).isRequired,
    mobileMenuOpen: PropTypes.bool.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    promoCodeUrl: PropTypes.string.isRequired,
    serverError: PropTypes.bool.isRequired,
    shouldRenderNewMenuDesign: PropTypes.bool.isRequired,
    showMobileMenu: PropTypes.func.isRequired,
    trackNavigationClick: PropTypes.func.isRequired,
  }

  renderBurgerMenu = () => {
    const {
      hideMobileMenu,
      hideNav,
      isAuthenticated,
      mobileMenuItems,
      mobileMenuOpen,
      onLoginClick,
      onLogoutClick,
      promoCodeUrl,
      serverError,
      showMobileMenu,
      trackNavigationClick,
    } = this.props

    return (
      <span>
        <BurgerMobileMenu
          hideNav={hideNav}
          isAuthenticated={isAuthenticated}
          menuItems={mobileMenuItems}
          onHide={hideMobileMenu}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
          promoCodeUrl={promoCodeUrl}
          show={mobileMenuOpen}
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
  onLoginClick = (e) => {
    const { onLoginClick, trackNavigationClick } = this.props
    trackNavigationClick('New Login Clicked')
    onLoginClick(e)
  }

  render() {
    const { shouldRenderNewMenuDesign, isAuthenticated, trackNavigationClick } = this.props

    return (
      <span className={css.linkMobileContainer}>
        {
          shouldRenderNewMenuDesign ?
            <LinkMobileMenu isAuthenticated={isAuthenticated} trackNavigationClick={trackNavigationClick} onLoginClick={this.onLoginClick} />
            : this.renderBurgerMenu()
        }
      </span>
    )
  }
}

export { MobileMenu }
