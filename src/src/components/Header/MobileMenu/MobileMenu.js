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
	}
	static defaultProps = {
	  isAuthenticated: false,
	}

	renderMenuItems = () => (
	  this.props.menuItems.map(menuItem => {
	    const { isAuthenticated } = this.props
	    if (menuItem.name === 'Home') {
	      return (
					<Link
					  to={menuItem.url}
					  className={css.menuItem}
					  activeClassName={classNames(css.menuItem, css.disabled)}
					  key={menuItem.name}
					  clientRouted={!Boolean(this.props.promoCodeUrl)}
					  onlyActiveOnIndex
					>
						<li className={isAuthenticated ? css.borderListElement : css.listElement}>
							{menuItem.name}
						</li>
					</Link>
	      )
	    }

	    if (menuItem.disabled) {
	      const listType = menuItem.name === 'Home' && isAuthenticated && css.borderListElement || (menuItem.name === 'My Gousto' || menuItem.name === 'Home') && css.listElement
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
				<Link to={menuItem.url} className={css.menuItem} key={menuItem.name} clientRouted={menuItem.clientRouted}>
					<li className={menuItem.name === 'My Gousto' ? css.listElement : css.childListElement}>
						{menuItem.name}
					</li>
				</Link>
	    )
	  })
	)

	render() {
	  const show = this.props.show
	  const isAuthenticated = this.props.isAuthenticated
	  const testingId = isAuthenticated ? 'burgerMenuLogout' : 'burgerMenuLogin'
	  const loginMenu = (
			<span className={css.menuItem} onClick={(isAuthenticated) ? this.props.logoutFunc : this.props.loginFunc}>
				<span className={(isAuthenticated) ? css['icon-logout'] : css['icon-login']} data-testing={testingId} />
				<li className={css.borderListElement}>
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
