import PropTypes from 'prop-types'
import React from 'react'
import css from './Block.css'

const Block = ({ children }) => (
  <div className={css.container}>
    {children}
  </div>
)

Block.propTypes = {
  children: PropTypes.node,
}

export default Block
