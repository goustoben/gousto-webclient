import PropTypes from 'prop-types'
import React from 'react'
import css from './Order.css'

export const Order = ({ date, numPeople, numRecipes }) => (
  <div className={css.order}>
    <div className={css.left}>
      <span className={css.calendar} />
    </div>
    <div className={css.right}>
      <div className={css.infoLine}>
        Box Scheduled for
        {date}
      </div>
      <div className={css.infoLine}>
        {numRecipes}
        {' '}
        Recipes for
        {' '}
        {numPeople}
        {' '}
        People
      </div>
    </div>
  </div>
)

Order.propTypes = {
  date: PropTypes.string.isRequired,
  numPeople: PropTypes.string.isRequired,
  numRecipes: PropTypes.string.isRequired,
}
