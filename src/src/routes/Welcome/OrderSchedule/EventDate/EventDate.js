import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import css from './EventDate.module.css'

const propTypes = {
  date: PropTypes.string.isRequired,
}

const EventDate = ({ date }) => (
  <div className={css.container}>
    <div className={css.month}>
      {date && moment(date, 'YYYY-MM-DD').format('MMM')}
    </div>
    <div className={css.day}>
      <div className={css.dayNumeric}>
        <h2>{date && moment(date, 'YYYY-MM-DD').format('DD')}</h2>
      </div>
      <div className={css.dayName}>
        {date && moment(date, 'YYYY-MM-DD').format('ddd')}
      </div>
    </div>
  </div>
)

EventDate.propTypes = propTypes

export { EventDate }
