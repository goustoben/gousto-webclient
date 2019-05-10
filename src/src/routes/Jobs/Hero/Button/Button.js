import PropTypes from 'prop-types'
import React from 'react'
import Link from 'Link'
import css from './Button.css'

const CTA = ({ children, link }) => (
  <div className={css.buttonContainer}>
    <Link to={link}>
      <div className={css.buttonInner}>
        <div className={css.buttonText}>
          <p className={css.copy} >{children}</p>
          <span className={css.chevron} aria-hidden="true" ></span>
        </div>
      </div>
    </Link>
  </div>
)

CTA.propTypes = {
  children: PropTypes.string,
  link: PropTypes.string,
}

export default CTA
