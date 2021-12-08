import React from 'react'
import PropTypes from 'prop-types'
import css from './BottomFixedContent.module.css'

const BottomFixedContent = ({ children }) => (
  <div className={css.wrapper}>
    {children}
  </div>
)

BottomFixedContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BottomFixedContent }
