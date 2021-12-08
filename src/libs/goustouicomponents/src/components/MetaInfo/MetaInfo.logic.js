import React from 'react'
import PropTypes from 'prop-types'
import css from './MetaInfo.module.css'

const MetaInfo = ({ label, children }) => (
  <div className={css.wrapper}>
    <div className={css.icon}>
      {children}
    </div>
    {label}
  </div>
)

MetaInfo.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export { MetaInfo }
