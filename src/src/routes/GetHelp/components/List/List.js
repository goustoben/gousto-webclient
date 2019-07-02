import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './List.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const List = ({ children }) => (
    <ul className={css.list}>
      {React.Children.map(children, (child) => (
          <li className={classnames(
            css.item,
            { [css.hiddenOnMobile]: child.props.isHiddenOnMobile })}
          >
            {child}
          </li>
      ))}
    </ul>
)

List.propTypes = propTypes

export {
  List
}
