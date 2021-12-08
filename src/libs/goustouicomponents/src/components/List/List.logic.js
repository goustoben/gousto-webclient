import React, { Children } from 'react'
import PropTypes from 'prop-types'
import css from './List.module.css'

const List = ({ children }) => {
  Children.forEach(children, (child) => {
    if (child && child.type && child.type.displayName !== List.Item.displayName) {
      throw new Error('Only List.Item components are accepted as children')
    }

    return null
  })

  return <ul className={css.wrapper}>{children}</ul>
}

List.propTypes = {
  children: PropTypes.node.isRequired,
}

const ListItem = ({ children }) => <li className={css.item}>{children}</li>
ListItem.displayName = 'List.Item'
ListItem.propTypes = {
  children: PropTypes.node.isRequired,
}

List.Item = ListItem

export { List }
