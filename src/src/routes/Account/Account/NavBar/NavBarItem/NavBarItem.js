import React from 'react'
import css from './NavBarItem.css'
import classnames from 'classnames'
import Link from 'Link'

const NavBarItem = ({ isActive, children, className, pathName, clientRouted }) => (
	<li className={classnames(css.tab, className, { [css.active]: isActive })}>
		{isActive ?
			<div className={classnames(className, { [css.bold]: isActive })}>{children}</div>
			:
			// `noDecoration` used here as some of the links can have badge and the badge need to stay without being underlined
			<Link href={pathName} clientRouted={clientRouted} noDecoration >
				{children}
			</Link>
		}
	</li>
)

NavBarItem.propTypes = {
	pathName: React.PropTypes.string,
	isActive: React.PropTypes.bool,
	children: React.PropTypes.node,
	className: React.PropTypes.string,
	clientRouted: React.PropTypes.bool,
}

NavBarItem.defaultProps = {
	pathName: '',
	isActive: false,
	className: '',
	clientRouted: false,
}

export default NavBarItem
