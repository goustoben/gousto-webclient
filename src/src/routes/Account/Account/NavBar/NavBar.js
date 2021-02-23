import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/routes'
import css from './NavBar.css'
import NavBarItem from './NavBarItem/NavBarItem'

const NavBar = (props) => {
  const { isNewSubscriptionPageEnabled, rateRecipeCount } = props
  const subscriptionUrl = isNewSubscriptionPageEnabled
    ? config.client.mySubscription2
    : config.client.mySubscription

  const menuTitles = {
    myGousto: 'My Gousto',
    myDeliveries: 'Upcoming Deliveries',
    mySubscription: 'Subscription Settings',
    myDetails: 'Account Details',
    myReferral: 'Free Food',
  }

  const menuItems = [
    {
      pathName: config.client.myGousto,
      clientRouted: true,
      item: (
        <span className={css.linkContainer}>
          <span className={classnames(css.link, css.mobileHide)}>{menuTitles.myGousto}</span>
        </span>
      ),
    },
    {
      pathName: config.client.myDeliveries,
      clientRouted: false,
      item: (
        <span className={css.linkContainer}>
          <span className={css.link}>{menuTitles.myDeliveries}</span>
        </span>
      ),
    },
    {
      pathName: subscriptionUrl,
      clientRouted: isNewSubscriptionPageEnabled,
      item: (
        <span className={css.linkContainer}>
          <span className={css.link}>{menuTitles.mySubscription}</span>
        </span>
      ),
    },
    {
      pathName: config.client.myDetails,
      clientRouted: false,
      item: (
        <span className={css.linkContainer}>
          <span className={css.link}>{menuTitles.myDetails}</span>
        </span>
      ),
      className: css.noBorderRight,
    },
    {
      pathName: config.client.myReferral,
      clientRouted: true,
      item: (
        <span className={css.linkContainer}>
          <span className={css.link}>
            <i className={`fa fa-heart ${css.mobileHide}`} />
            <span>{menuTitles.myReferral}</span>
          </span>
        </span>
      ),
    },
    {
      pathName: config.client.rateMyRecipes,
      clientRouted: false,
      item: (
        <span className={css.mobileHide}>
          <span className={css.link}>Rate My Recipes</span>
          {rateRecipeCount > 0 ? <span className={css.badge}>{rateRecipeCount}</span> : null}
        </span>
      ),
    },
  ]

  return (
    <div className={css.navContainer}>
      <div className={css.navInner}>
        <ul className={css.nav}>
          {menuItems.map((menuItem) => (
            <NavBarItem
              key={menuItem.pathName}
              pathName={menuItem.pathName}
              isActive={props.currentPath === menuItem.pathName}
              className={menuItem.className ? menuItem.className : ''}
              clientRouted={menuItem.clientRouted}
            >
              {menuItem.item}
            </NavBarItem>
          ))}
        </ul>
      </div>
    </div>
  )
}

NavBar.propTypes = {
  currentPath: PropTypes.string,
  isNewSubscriptionPageEnabled: PropTypes.bool,
  rateRecipeCount: PropTypes.number,
}

NavBar.defaultProps = {
  currentPath: config.client.myGousto,
  isNewSubscriptionPageEnabled: false,
  rateRecipeCount: 0,
}

export default NavBar
