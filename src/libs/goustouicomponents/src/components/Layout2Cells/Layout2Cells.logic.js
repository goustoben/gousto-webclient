import React, { Children } from 'react'
import PropTypes from 'prop-types'
import css from './Layout2Cells.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const Layout2Cells = ({ children }) => (
  <div className={css.wrapper}>
    {
      Children.map(children, (child, index) => (
        <div className={css[`item-${index}`]}>
          {child}
        </div>
      ))
    }
  </div>
)

Layout2Cells.propTypes = propTypes

export {
  Layout2Cells,
}
