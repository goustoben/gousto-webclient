import React from 'react'
import PropTypes from 'prop-types'
import css from './List.css'

const propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
}

const List = ({ listItems, className }) => (
  <ul className={css.list}>
    {listItems.map(listItem => (
      <li key={listItem} className={className}>
        <span className={css.bullet}><i className={css.tick} /></span>
        {listItem}
      </li>
    ))}
  </ul>
)

List.propTypes = propTypes

export { List }
