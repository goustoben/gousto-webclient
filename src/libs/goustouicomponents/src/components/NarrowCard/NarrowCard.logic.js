import React from 'react'
import PropTypes from 'prop-types'
import css from './NarrowCard.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const NarrowCard = ({ children }) => (
  <div className={css.card}>
    {children}
  </div>
)

NarrowCard.propTypes = propTypes

export {
  NarrowCard,
}
