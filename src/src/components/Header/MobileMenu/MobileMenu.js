import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'Link'
import css from './MobileMenu.css'

class MobileMenu extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    menuItems: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loginFunc: PropTypes.func.isRequired,
    logoutFunc: PropTypes.func.isRequired,
    hideNav: PropTypes.bool.isRequired,
    promoCodeUrl: PropTypes.string,
    trackNavigationClick: PropTypes.func,
  }
  static defaultProps = {
    isAuthenticated: false,
  }

  renderMenuItems = () => {
    const { menuItems, promoCodeUrl, trackNavigationClick} = this.props

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
            clientRouted={!Boolean(promoCodeUrl)}
            onlyActiveOnIndex
          >
            <li className={isAuthenticated ? css.borderListElement : css.listElement}>
              {menuItem.name}
            </li>
          </Link>
        )
      }

      if (menuItem.disabled) {
        const listType = homeMenuItem && isAuthenticated && css.borderListElement || (myGoustoMenuItem || homeMenuItem) && css.listElement
        || css.childListElement

        return (
          <span className={classNames(css.menuItem, css.disabled)} key={menuItem.name}>
            <li className={listType}>
              {menuItem.name}
            </li>
          </span>
        )
      }

      return (
        <Link to={menuItem.url} className={css.menuItem} key={menuItem.name} clientRouted={menuItem.clientRouted} tracking={() => trackNavigationClick(menuItem.tracking)}>
          <li className={myGoustoMenuItem ? css.listElement : css.childListElement}>
            {menuItem.name}
          </li>
        </Link>
      )
    })
  }

  render() {
    const show = this.props.show
    const isAuthenticated = this.props.isAuthenticated
    const testingId = isAuthenticated ? 'burgerMenuLogout' : 'burgerMenuLogin'
    const loginMenu = (
      <span className={css.menuItem} onClick={(isAuthenticated) ? this.props.logoutFunc : this.props.loginFunc}>
        <li className={css.borderListElement} data-testing={testingId}>
          {(isAuthenticated) ? 'Logout' : 'Login'}
        </li>
      </span>
    )

    return (
      <div
        className={classNames({ [css.hidden]: !show, [css.show]: show })}
        ref={ref => { this.domNode = ref }}
      >
        <ul className={css.list}>
          {(!this.props.hideNav) ? this.renderMenuItems() : ''}
          {loginMenu}
        </ul>
      </div>
    )
  }
}

export default MobileMenu
