import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Link from 'Link'
import css from './NavBarItem.module.css'

const NavBarItem = ({ isActive, children, className, pathName, clientRouted, tracking }) => (
  <li className={classnames(css.tab, className, { [css.active]: isActive })}>
    {isActive ? (
      <div className={classnames(className, { [css.bold]: isActive })}>{children}</div>
    ) : (
      // `noDecoration` used here as some of the links can have badge and the badge need to stay without being underlined
      <Link
        to={pathName}
        clientRouted={clientRouted}
        noDecoration
        tracking={tracking}
      >
        {children}
      </Link>
    )}
  </li>
)

NavBarItem.propTypes = {
  pathName: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  clientRouted: PropTypes.bool,
  tracking: PropTypes.func
}

NavBarItem.defaultProps = {
  pathName: '',
  isActive: false,
  className: '',
  clientRouted: false,
  tracking: () => {}
}

export default NavBarItem
