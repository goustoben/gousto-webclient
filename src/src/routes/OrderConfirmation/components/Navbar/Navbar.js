import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Navbar.css'

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })).isRequired,
  active: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const Navbar = ({ items, onClick, active }) => (
  <ul className={css.navbarContainer}>
    {items.map(item => (
      <li className={css.navbarItems} key={item.id} >
        <button className={active == item.id ? classnames(css.navbarButton, css.active) : css.navbarButton} type="button" onClick={() => onClick(item.id)}>{item.label}</button>
      </li>
    ))}
  </ul>
)

Navbar.propTypes = propTypes

export { Navbar }
