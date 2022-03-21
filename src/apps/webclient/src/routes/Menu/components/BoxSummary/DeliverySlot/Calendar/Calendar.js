import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import css from './Calendar.css'
import { Title } from './Title'
import { Day } from './Day'
import { getCalendarDates } from './utils/getCalendarDates'
import { datesPropType } from '../deliverySlotPropTypes'

const dayNoToDayName = dayNo => (
  moment(dayNo, 'E').format('ddd')
)

function dateToDay(dateString, date, weekNo, dayNo, selected) {
  return {
    weekNo: `${weekNo}`,
    dayNo: `${dayNo}`,
    date: dateString || null,
    disabled: date ? date.disabled : true,
    selected: date ? date.date === selected : false,
    icon: date ? date.icon : null,
    orderId: date ? date.orderId : null
  }
}

const createGrid = (start, finish, dates, selectedDate) => {
  const startMoment = moment(start)
  const finishMoment = moment(finish)

  // days (calendar rows) by weekday
  const output = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  }

  for (const m = startMoment; m.diff(finishMoment, 'days') <= 0; m.add(1, 'days')) {
    const dateString = m.format('YYYY-MM-DD')
    const matchingDate = dates.find(d => d && d.date === dateString)
    const weekNo = parseInt(m.format('GGGGWW'), 10)
    const dayNo = parseInt(m.format('E'), 10)
    const weekday = m.isoWeekday()

    const day = dateToDay(dateString, matchingDate, weekNo, dayNo, selectedDate)

    output[weekday].push(day)
  }

  return output
}

const Calendar = ({ dates, selected, onClick }) => {
  if (!dates || dates.length === 0) {
    return null
  }

  const DAY_ORDER = [6, 7, 1, 2, 3, 4, 5]
  const { start, finish } = getCalendarDates(dates)
  const grid = createGrid(start, finish, dates, selected, onClick)

  return (
    <div className={css.calendar}>
      <Title dates={dates} />
      <div className={css.grid}>
        {DAY_ORDER.map(dayNo => (
          <div key={dayNo} className={css.column}>
            <div className={css.dayName}>{dayNoToDayName(dayNo)}</div>
            {
              grid[dayNo].map(date => (
                <Day
                  key={`${date.weekNo}-${date.dayNo}`}
                  className={css.day}
                  onClick={onClick}
                  date={date.date}
                  weekNo={date.weekNo}
                  dayNo={date.dayNo}
                  selected={date.selected}
                  disabled={date.disabled}
                  icon={date.icon}
                  orderId={date.orderId}
                />
              ))
            }
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  dates: datesPropType.isRequired,
  selected: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { Calendar }
