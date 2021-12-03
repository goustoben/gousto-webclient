import React from 'react'
import PropTypes from 'prop-types'
import css from './TickList.module.css'

const TickList = ({ listItems, listItemClassName }) => (
  <ul className={css.list}>
    {listItems.map(listItem => (
      <li key={listItem} className={listItemClassName}>
        <span className={css.bullet}><i className={css.tick} /></span>
        {listItem}
      </li>
    ))}
  </ul>
)

TickList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string),
  listItemClassName: PropTypes.string
}

TickList.defaultProps = {
  listItems: [],
  listItemClassName: null,
}

export { TickList }
