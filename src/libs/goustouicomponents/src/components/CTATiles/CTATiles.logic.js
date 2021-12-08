import React, { Children } from 'react'
import PropTypes from 'prop-types'
import css from './CTATiles.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const CTATiles = ({ children }) => (
  <nav>
    <ul className={css.list}>
      {
        Children.map(children, (child) => (
          <li className={css.listItem}>
            {child}
          </li>
        ))
      }
    </ul>
  </nav>
)

CTATiles.propTypes = propTypes

export { CTATiles }
