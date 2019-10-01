import React from 'react'
import PropTypes from 'prop-types'
import css from './TickList.css'

const propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}

const TickList = ({ listItems, className }) => (
  <ul className={css.list}>
    {listItems.map(listItem => (
      <li key={listItem} className={className}>
        <span className={css.bullet}><i className={css.tick} /></span>
        {listItem}
      </li>
    ))}
  </ul>
)

TickList.propTypes = propTypes

export { TickList }
