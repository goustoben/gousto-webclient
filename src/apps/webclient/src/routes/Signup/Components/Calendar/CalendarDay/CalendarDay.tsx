import React from 'react'

import classnames from 'classnames'

import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'

import css from './CalendarDay.css'

interface CalendarDayProps extends CalendarDayInfo {
  /**
   * Callback to call once day is clicked by user.
   */
  onDayClick: (date: CalendarDayInfo['date']) => void
}

/**
 * Single day on calendar. Displays itself differently based on passed flags.
 */
export const CalendarDay = ({
  date,
  isSelected,
  isBeforeTodayDate,
  isToday,
  onDayClick,
  isDeliveryDay,
}: CalendarDayProps) => (
  <td className={css.tableCell}>
    <div className={css.squareContainer}>
      <button
        type="button"
        onClick={() => isDeliveryDay && onDayClick(date)}
        className={classnames(css.day, {
          [css.dayBeforeToday]: isBeforeTodayDate,
          [css.todayDay]: isToday,
          [css.disabled]: !isDeliveryDay,
          [css.selectedDay]: isSelected,
        })}
        disabled={!isDeliveryDay}
      >
        <span className={css.dayNumber}>{date.date()}</span>
      </button>
    </div>
  </td>
)
