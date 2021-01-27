import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/routes'
import css from './NavBar.css'
import NavBarItem from './NavBarItem/NavBarItem'
import { OptimizelyRolloutsContainer } from '../../../../containers/OptimizelyRollouts'

const menuTitles = {
  myGousto: 'My Gousto',
  myDeliveries: 'Upcoming Deliveries',
  mySubscription: 'Subscription Settings',
  myDetails: 'Account Details',
  myReferral: 'Free Food'
}

const getMenuItems = ({ subscriptionUrl, isNewSubscriptionPageEnabled, experimentEnabled }) => ({
  myGousto: {
    pathName: config.client.myGousto,
    clientRouted: true,
    item: (
      <span className={classnames(css.link, css.mobileHide)}>
        {menuTitles.myGousto}
      </span>
    ),
  },
  myDeliveries: {
    pathName: config.client.myDeliveries,
    clientRouted: false,
    item: (
      <span className={css.link}>
        {menuTitles.myDeliveries}
      </span>
    ),
  },
  mySubscription: {
    pathName: subscriptionUrl,
    clientRouted: isNewSubscriptionPageEnabled,
    item: (
      <span className={css.link}>
        {menuTitles.mySubscription}
      </span>
    ),
  },
  myDetails: {
    pathName: config.client.myDetails,
    clientRouted: false,
    item: (
      <span className={classnames(css.link, { [css.mobileHide]: experimentEnabled })}>
        <span className={css.link}>
          {menuTitles.myDetails}
        </span>
      </span>
    ),
    className: css.noBorderRight,
  },
  myReferral: {
    pathName: config.client.myReferral,
    clientRouted: true,
    item: (
      <span className={css.link}>
        <i className={`fa fa-heart ${css.mobileHide}`} />
        <span>{menuTitles.myReferral}</span>
      </span>
    ),
  },
  rateMyRecipes: {
    pathName: config.client.rateMyRecipes,
    clientRouted: false,
    item: (
      <span className={classnames({ [css.mobileHide]: !experimentEnabled })}>
        <span className={css.link}>
          Rate
          {' '}
          <span className={css.tabletHide}>My </span>
          Recipes
        </span>
      </span>
    ),
  }
})

export const MenuItems = ({ currentPath, experimentEnabled, subscriptionUrl, isNewSubscriptionPageEnabled }) => {
  const menuItemDictionary = getMenuItems({ subscriptionUrl, isNewSubscriptionPageEnabled, experimentEnabled })

  const menuItems = [
    menuItemDictionary.myGousto,
    menuItemDictionary.myDeliveries,
    menuItemDictionary.mySubscription,
    menuItemDictionary.myDetails,
    menuItemDictionary.myReferral,
    menuItemDictionary.rateMyRecipes
  ]

  const experimentalMenuItems = [
    menuItemDictionary.myGousto,
    menuItemDictionary.myDeliveries,
    menuItemDictionary.mySubscription,
    menuItemDictionary.rateMyRecipes,
    menuItemDictionary.myReferral,
    menuItemDictionary.myDetails,
  ]

  const orderedMenuItems = experimentEnabled ? experimentalMenuItems : menuItems

  return orderedMenuItems.map((menuItem) => (
    <NavBarItem
      key={menuItem.pathName}
      pathName={menuItem.pathName}
      isActive={currentPath === menuItem.pathName}
      className={(menuItem.className) ? menuItem.className : ''}
      clientRouted={menuItem.clientRouted}
    >
      {menuItem.item}
    </NavBarItem>
  ))
}

const NavBar = (props) => {
  const { isNewSubscriptionPageEnabled, currentPath } = props
  const subscriptionUrl = isNewSubscriptionPageEnabled ? config.client.mySubscription2 : config.client.mySubscription

  return (
    <div className={css.navContainer}>
      <div className={css.navInner}>
        <ul className={css.nav}>
          <OptimizelyRolloutsContainer featureName="web_rate_recipe_navbar_order_experiment" featureEnabled>
            <MenuItems
              currentPath={currentPath}
              subscriptionUrl={subscriptionUrl}
              isNewSubscriptionPageEnabled={isNewSubscriptionPageEnabled}
              experimentEnabled
            />
          </OptimizelyRolloutsContainer>

          <OptimizelyRolloutsContainer featureName="web_rate_recipe_navbar_order_experiment" featureEnabled={false}>
            <MenuItems
              currentPath={currentPath}
              subscriptionUrl={subscriptionUrl}
              isNewSubscriptionPageEnabled={isNewSubscriptionPageEnabled}
              experimentEnabled={false}
            />
          </OptimizelyRolloutsContainer>
        </ul>
      </div>
    </div>
  )
}

NavBar.propTypes = {
  currentPath: PropTypes.string,
  isNewSubscriptionPageEnabled: PropTypes.bool,
}

NavBar.defaultProps = {
  currentPath: config.client.myGousto,
  isNewSubscriptionPageEnabled: false
}

export default NavBar
