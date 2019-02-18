import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/routes'
import css from './NavBar.css'
import NavBarItem from './NavBarItem/NavBarItem'
import { client, legacy } from 'config/globals'

const NavBar = (props) => {
  const referFriendPlaceholderText = 'Free Food'
  const menuItems = [
    {
      pathName: config.client.myGousto,
      item: (
				<span className={classnames(css.link, css.mobileHide)}>My Gousto</span>
      ),
    }, {
      pathName: (client && !legacy) ? config.client.myDeliveries2 : config.client.myDeliveries,
      item: (
				<span className={css.link}>Deliveries</span>
      ),
    }, {
      pathName: config.client.mySubscription,
      item: (
				<span className={css.link}>Subscription</span>
      ),
    }, {
      pathName: config.client.myDetails,
      item: (
				<span className={css.link}>Details</span>
      ),
      className: css.noBorderRight,
    }, {
      pathName: config.client.myReferral,
      item: (
				<span className={css.link}>
					<i className={`fa fa-heart ${css.mobileHide}`}></i> <span>{referFriendPlaceholderText}</span>
				</span>
      ),
    }, {
      pathName: config.client.rateMyRecipes,
      item: (
				<span className={css.mobileHide}>
					<span className={css.link}>
						Rate <span className={css.tabletHide}>My </span>Recipes
					</span>
					{(props.rateRecipeCount > 0) ? <span className={css.badge}>{props.rateRecipeCount}</span> : null}
				</span>
      ),
    },
  ]

  return (
		<div className={css.navContainer}>
			<div className={css.navInner}>
				<ul className={css.nav}>
					{menuItems.map((menuItem, index) => (
						<NavBarItem
						  key={index}
						  pathName={menuItem.pathName}
						  isActive={props.currentPath === menuItem.pathName}
						  className={(menuItem.className) ? menuItem.className : ''}
						  clientRouted={(client && !legacy)}
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
}

NavBar.defaultProps = {
  currentPath: config.client.myGousto,
  rateRecipeCount: 0,
}

export default NavBar
