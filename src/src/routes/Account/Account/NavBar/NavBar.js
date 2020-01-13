import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/routes'
import css from './NavBar.css'
import NavBarItem from './NavBarItem/NavBarItem'

const NavBar = (props) => {
  const { rateRecipeCount, isAccountTabNameTest } = props

  let menuTitles = {
    myGousto: 'My Gousto', 
    myDeliveries: 'Deliveries',
    mySubscription: 'Subscription',
    myDetails: 'Details',
    myReferral: 'Free Food'
  }
  
  if (isAccountTabNameTest) {
    menuTitles = {
      ...menuTitles,
      myDeliveries: 'Upcoming Deliveries',
      mySubscription: 'Subscription Settings',
      myDetails: 'Account Details',
    }
  } 

  const menuItems = [
    {
      pathName: config.client.myGousto,
      clientRouted: true,
      item: (
        <span className={classnames(css.link, css.mobileHide)}>
          {menuTitles.myGousto}
        </span>
      ),
    }, {
      pathName: config.client.myDeliveries,
      clientRouted: false,
      item: (
        <span className={css.link}>
          {menuTitles.myDeliveries}
        </span>
      ),
    }, {
      pathName: config.client.mySubscription,
      clientRouted: false,
      item: (
        <span className={css.link}>
          {menuTitles.mySubscription}
        </span>
      ),
    }, {
      pathName: config.client.myDetails,
      clientRouted: false,
      item: (
        <span className={css.link}>
          {menuTitles.myDetails}
        </span>
      ),
      className: css.noBorderRight,
    }, {
      pathName: config.client.myReferral,
      clientRouted: true,
      item: (
        <span className={css.link}>
          <i className={`fa fa-heart ${css.mobileHide}`} />
          <span>{menuTitles.myReferral}</span>
        </span>
      ),
    }, {
      pathName: config.client.rateMyRecipes,
      clientRouted: false,
      item: (
        <span className={css.mobileHide}>
          <span className={css.link}>
            Rate <span className={css.tabletHide}>My </span>Recipes
          </span>
          {(rateRecipeCount > 0) ? <span className={css.badge}>{rateRecipeCount}</span> : null}
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
              className={(menuItem.className) ? menuItem.className : ''}
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
  rateRecipeCount: PropTypes.number,
  isAccountTabNameTest: PropTypes.bool,

}

NavBar.defaultProps = {
  currentPath: config.client.myGousto,
  rateRecipeCount: 0,
  isAccountTabNameTest: false,
}

export default NavBar
