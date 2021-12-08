import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import logo from 'design-language/media/logo.svg'
import { routes } from 'gousto-config'
import css from './Header.module.css'
import { LayoutPageWrapper } from '../LayoutPageWrapper'
import { HeaderNavList } from './HeaderNavList'
import { HeaderNavExtendedList } from './HeaderNavExtendedList'

const { goustoWebclient } = routes

const NAVIGATION = {
  LOGGED_OUT_ITEMS: ['home', 'boxPrices', 'chooseRecipes', 'sustainability', 'help'],
  LOGGED_OUT_ITEMS_EXTENDED: {
    home: ['boxPrices', 'chooseRecipes', 'sustainability', 'help'],
  },
  LOGGED_IN_ITEMS: ['home', 'chooseRecipes', 'freeFood', 'sustainability', 'help', 'myGousto'],
  LOGGED_IN_ITEMS_EXTENDED: {
    myGousto: ['deliveries', 'subscription', 'details', 'freeFood', 'rateMyRecipes'],
    home: ['chooseRecipes', 'sustainability', 'help'],
  },
}

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExtendedNavigationVisible: false,
    }
  }

  toggleExtendedNavigationVisibility = () => {
    const { isExtendedNavigationVisible } = this.state

    this.setState({
      isExtendedNavigationVisible: !isExtendedNavigationVisible,
    })
  }

  convertMenuItemsToRoute = (items) => items.map((item) => goustoWebclient[item])

  convertExtendedItemsToRoute = (items) => {
    const topItems = Object.keys(items)
    const extendedMenu = topItems.map((topItem) => {
      const result = goustoWebclient[topItem]
      result.subItems = this.convertMenuItemsToRoute(items[topItem])

      return result
    })

    return extendedMenu
  }

  renderHeaderNavListsAndCTA = () => {
    const { hasDataTracking, isAuthenticated } = this.props
    const { isExtendedNavigationVisible } = this.state
    const navListItems = this.convertMenuItemsToRoute(isAuthenticated ? NAVIGATION.LOGGED_IN_ITEMS : NAVIGATION.LOGGED_OUT_ITEMS)
    const navExtendedListItems = this.convertExtendedItemsToRoute(isAuthenticated ? NAVIGATION.LOGGED_IN_ITEMS_EXTENDED : NAVIGATION.LOGGED_OUT_ITEMS_EXTENDED)

    return (
      <div>
        <button
          type="button"
          className={classnames(css.navExtendedOpenCTA, { [css.isExtended]: isExtendedNavigationVisible })}
          onClick={this.toggleExtendedNavigationVisibility}
        />
        <HeaderNavList
          items={navListItems}
          isAuthenticated={isAuthenticated}
          hasDataTracking={hasDataTracking}
        />
        <HeaderNavExtendedList
          items={navExtendedListItems}
          isExtendedNavigationVisible={isExtendedNavigationVisible}
          isAuthenticated={isAuthenticated}
          hasDataTracking={hasDataTracking}
        />
      </div>
    )
  }

  render() {
    const { isNavEnabled } = this.props

    return (
      <header className={css.wrapper}>
        <LayoutPageWrapper>
          <div className={css.content}>
            <a href="/" className={css.logo}>
              <img src={logo} alt="gousto" />
            </a>
            {isNavEnabled && this.renderHeaderNavListsAndCTA()}
          </div>
        </LayoutPageWrapper>
      </header>
    )
  }
}

Header.propTypes = {
  /**
   * Adds `data-tracking-action` and `data-tracking-property` to some items,
   * which works in the clients which have enabled that way of tracking.
   */
  hasDataTracking: PropTypes.bool,
  /**
   * Passing `isNavEnabled` in as false will disable the entire navigation as
   * seen in the signup wizard.
   */
  isAuthenticated: PropTypes.bool.isRequired,
  isNavEnabled: PropTypes.bool,
}

Header.defaultProps = {
  hasDataTracking: false,
  isNavEnabled: true,
}

export {
  Header,
  NAVIGATION,
}
