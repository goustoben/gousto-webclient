import React from 'react'
import PropTypes from 'prop-types'
import { CTABack } from 'zest/CTABack'
import css from './Navbar.css'

export const Navbar = ({ title }) => (
  <div className={css.navbar}>
    <div className={css.buttonWrapper}>
      <CTABack label="Back" url="/menu" />
    </div>
    <h1 className={css.title}>{title}</h1>
  </div>
)

Navbar.propTypes = {
  title: PropTypes.string.isRequired
}
