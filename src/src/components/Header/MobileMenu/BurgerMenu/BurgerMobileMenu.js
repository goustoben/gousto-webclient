import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
  static propTypes = {
    show: PropTypes.bool.isRequired,
    menuItems: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    hideNav: PropTypes.bool.isRequired,
    promoCodeUrl: PropTypes.string,
    trackNavigationClick: PropTypes.func,
  }
  static defaultProps = {
    isAuthenticated: false,
  }

  renderMenuItems = () => {
    const {
      menuItems,
      promoCodeUrl,
      trackNavigationClick
    } = this.props

    return menuItems.map(menuItem => {
      const { isAuthenticated } = this.props
      const myGoustoMenuItem = menuItem.name === 'My Gousto'
      const homeMenuItem = menuItem.name === 'Home'
      if (homeMenuItem) {
        return (
          <Link
            to={menuItem.url}
            className={css.menuItem}
            activeClassName={classNames(css.menuItem, css.disabled)}
            key={menuItem.name}
            clientRouted={!promoCodeUrl}
            onlyActiveOnIndex
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

      const openNewTab = menuItem.name === 'Help'

      return (
        <Link
          to={menuItem.url}
          className={css.menuItem}
          key={menuItem.name}
          clientRouted={menuItem.clientRouted}
          tracking={() => trackNavigationClick(menuItem.tracking)}
          target={openNewTab ? '_blank' : null}
          rel={openNewTab ? 'noopener noreferrer' : null}
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
      <button type='button' className={css.menuItem} onClick={(isAuthenticated) ? onLogoutClick : onLoginClick}>
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

export { BurgerMobileMenu }
