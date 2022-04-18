import moment, { Moment } from 'moment'
import Svg from 'Svg'
import React from 'react'
import css from './CalendarSpan.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Jun', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec']

interface CalendarSpanProps {
  /**
   * Last day of calendar span.
   */
  lastCalendarDay: Moment
}

export const CalendarSpan = ({ lastCalendarDay }: CalendarSpanProps) => {
  const today = moment()
  const todayMonth = MONTHS[today.month()]
  const lastCalendarDayMonth = MONTHS[lastCalendarDay.month()]
  const calendarBeginning =
    today.date() + (todayMonth === lastCalendarDayMonth ? '' : ` ${todayMonth}`)
  const calendarEnding = `${lastCalendarDay.date()} ${lastCalendarDayMonth}`

  return (
    <div className={css.calendarSpan}>
      <Svg fileName="icon-calendar-black" className={css.calendarIcon} />
      <span>{`${calendarBeginning} - ${calendarEnding}`}</span>
    </div>
  )
}
