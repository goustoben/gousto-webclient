import React from 'react'
import PropTypes from 'prop-types'

import css from './List.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const List = ({ children }) => (
  <ul className={css.list}>
    {React.Children.map(children, (child) => (
      <li className={css.item}>
        {child}
      </li>
    ))}
  </ul>
)

List.propTypes = propTypes

export {
  List
}
