import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import { getLinkURL } from 'utils/header'
import Link from 'Link'
import css from '../MobileMenu.css'

const getCssClassForMenuItem = (homeMenuItem, myGoustoMenuItem, isAuthenticated) => {
  if (homeMenuItem && isAuthenticated) {
    return css.borderListElement
  } else if (myGoustoMenuItem || homeMenuItem) {
    return css.listElement
  }

  return css.childListElement
}

class BurgerMobileMenu extends React.PureComponent {
  showHelpPreLogin = () => {
    const { helpPreLoginVisibilityChange } = this.props
    helpPreLoginVisibilityChange(true)
  }

  renderMenuItems = () => {
    const {
      menuItems,
      promoCodeUrl,
      trackNavigationClick,
      isHelpCentreActive,
      isMenuRedirectPageEnabled,
      postCode,
      trackClickRateRecipes
    } = this.props

    return menuItems.map(menuItem => {
      const { isAuthenticated } = this.props
      const myGoustoMenuItem = menuItem.name === 'My Gousto'
      const homeMenuItem = menuItem.name === 'Home'
      const isHelpPreloginNeeded = menuItem.name.toLowerCase() === 'help'
      const rateRecipesItem = menuItem.name === 'Rate My Recipes'

      if (isHelpPreloginNeeded && !isAuthenticated) {
        return (
          <span
            key={menuItem.name}
            className={css.menuItem}
            data-test="help-link"
            role="button"
            tabIndex="0"
            onClick={this.showHelpPreLogin}
            onKeyDown={onEnter(this.showHelpPreLogin)}
          >
            <li className={css.childListElement}>
              {menuItem.name}
            </li>
          </span>
        )
      }

      if (homeMenuItem) {
        return (
          <Link
            to={menuItem.url}
            className={css.menuItem}
            activeclassname={classNames(css.menuItem, css.disabled)}
            key={menuItem.name}
            clientRouted={!promoCodeUrl}
          >
            <li className={isAuthenticated ? css.borderListElement : css.listElement}>
              {menuItem.name}
            </li>
          </Link>
        )
      }

      if (menuItem.disabled) {
        const listType = getCssClassForMenuItem(homeMenuItem, myGoustoMenuItem, isAuthenticated)

        return (
          <span className={classNames(css.menuItem, css.disabled)} key={menuItem.name}>
            <li className={listType}>
              {menuItem.name}
            </li>
          </span>
        )
      }

      const isHelpLink = menuItem.name === 'Help'
      const url = getLinkURL({ isHelpCentreActive, menuItem, isMenuRedirectPageEnabled, isAuthenticated, postCode })

      if (rateRecipesItem) {
        return (
          <Link
            to={url}
            className={css.menuItem}
            key={menuItem.name}
            clientRouted={isHelpCentreActive ? false : menuItem.clientRouted}
            tracking={() => {
              trackClickRateRecipes('hamburger')
              trackNavigationClick(menuItem.tracking)
            }}
          >
            <li className={myGoustoMenuItem ? css.listElement : css.childListElement}>
              {menuItem.name}
            </li>
          </Link>
        )
      }

      return (
        <Link
          to={url}
          data-optimizely={isHelpLink ? 'mobile-header-help-link' : null}
          className={css.menuItem}
          key={menuItem.name}
          clientRouted={isHelpCentreActive ? false : menuItem.clientRouted}
          tracking={() => {
            trackNavigationClick(menuItem.tracking)
          }}
        >
          <li className={myGoustoMenuItem ? css.listElement : css.childListElement}>
            {menuItem.name}
          </li>
        </Link>
      )
    })
  }

  render() {
    const { show, isAuthenticated, hideNav, onLogoutClick, onLoginClick } = this.props
    const testingId = isAuthenticated ? 'burgerMenuLogout' : 'burgerMenuLogin'
    const loginMenu = (
      <button type="button" className={css.menuItem} onClick={(isAuthenticated) ? onLogoutClick : onLoginClick}>
        <li className={css.borderListElement} data-testing={testingId}>
          {(isAuthenticated) ? 'Logout' : 'Login'}
        </li>
      </button>
    )

    return (
      <div
        className={classNames(css.defaultState, { [css.show]: show })}
        ref={ref => { this.domNode = ref }}
      >
        <ul className={css.list}>
          {(!hideNav) ? this.renderMenuItems() : ''}
          {loginMenu}
        </ul>
      </div>
    )
  }
}

BurgerMobileMenu.propTypes = {
  helpPreLoginVisibilityChange: PropTypes.func.isRequired,
  hideNav: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  menuItems: PropTypes.array.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  promoCodeUrl: PropTypes.string,
  show: PropTypes.bool.isRequired,
  trackNavigationClick: PropTypes.func.isRequired,
  isHelpCentreActive: PropTypes.bool,
  isMenuRedirectPageEnabled: PropTypes.bool,
  postCode: PropTypes.string,
  trackClickRateRecipes: PropTypes.func
}

BurgerMobileMenu.defaultProps = {
  isAuthenticated: false,
  isHelpCentreActive: false,
  postCode: '',
  isMenuRedirectPageEnabled: false,
  trackClickRateRecipes: () => {}
}

export { BurgerMobileMenu }
