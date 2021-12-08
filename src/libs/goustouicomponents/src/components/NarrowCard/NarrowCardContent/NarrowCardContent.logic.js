import React from 'react'
import PropTypes from 'prop-types'
import css from './NarrowCardContent.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const NarrowCardContent = ({ children }) => (
  <div className={css.content}>
    {children}
  </div>
)

NarrowCardContent.propTypes = propTypes

export {
  NarrowCardContent,
}
