import React from 'react'
import classnames from 'classnames'
import css from './Navbar.css'

const Navbar = ({items, onClick, active}) => (
  <ul className={css.navbarContainer}>
    {items.map(item => (
      <li className={css.navbarItems} key={item.id} >
        <button className={active == item.label ? classnames(css.navbarButton, css.active) : css.navbarButton} type="button" onClick={() => onClick(item.label)}>{item.label}</button>
      </li>
    ))}
  </ul>
)

export { Navbar }
