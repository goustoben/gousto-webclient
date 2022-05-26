import React, { ReactNode } from 'react'

import moment, { Moment } from 'moment'

import { CalendarDay } from 'routes/Signup/Components/Calendar/CalendarDay/CalendarDay'
import { CalendarSpan } from 'routes/Signup/Components/Calendar/CalendarSpan/CalendarSpan'
import { useCalendarDays } from 'routes/Signup/Components/Calendar/hooks/useCalendarDays'
import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'
import { DeliveryDay } from 'routes/Signup/Components/Calendar/models/DeliveryDay'
import { getLatestDeliveryDay } from 'routes/Signup/Components/Calendar/utils/getLatestDeliveryDay'
import { splitDaysIntoWeeks } from 'routes/Signup/Components/Calendar/utils/splitDaysIntoWeeks'

import css from './Calendar.css'

const DELIVERY_DAY_FORMAT = 'YYYY-MM-DD'

interface CalendarProps {
  deliveryDays: Array<DeliveryDay>
  selectedDay: DeliveryDay['date']
  onDayChange: (day: DeliveryDay['date']) => void
}

export const Calendar = ({ deliveryDays, selectedDay, onDayChange }: CalendarProps) => {
  const weeksInCalendar = 4 // requirement by design
  const calendarDays = useCalendarDays(weeksInCalendar, deliveryDays, selectedDay)
  const latestAvailableDeliveryDay = getLatestDeliveryDay(calendarDays)?.date || moment()
  const weeks = splitDaysIntoWeeks(weeksInCalendar, calendarDays)

  const onDayClick = (date: Moment) => onDayChange(date.format(DELIVERY_DAY_FORMAT))

  const renderDay = ({
    date,
    isToday,
    isBeforeTodayDate,
    isSelected,
    isDeliveryDay,
  }: CalendarDayInfo): ReactNode => (
    <CalendarDay
      key={date.date().toString()}
      date={date}
      isBeforeTodayDate={isBeforeTodayDate}
      isToday={isToday}
      isSelected={isSelected}
      isDeliveryDay={isDeliveryDay}
      onDayClick={onDayClick}
    />
  )

  const renderWeek = (days: Array<CalendarDayInfo>): ReactNode => {
    const rowKey = days[0]?.date.toString()

    return <tr key={rowKey}>{days.map(renderDay)}</tr>
  }

  if (calendarDays.length === 0) {
    return null
  }

  return (
    <>
      <CalendarSpan lastCalendarDay={latestAvailableDeliveryDay} />
      <table className={css.calendarTable}>
        <thead className={css.calendarTableHead}>
          <tr>
            <th className={css.headerCell}>M</th>
            <th className={css.headerCell}>T</th>
            <th className={css.headerCell}>W</th>
            <th className={css.headerCell}>T</th>
            <th className={css.headerCell}>F</th>
            <th className={css.headerCell}>S</th>
            <th className={css.headerCell}>S</th>
          </tr>
        </thead>
        <tbody>{weeks.map(renderWeek)}</tbody>
      </table>
    </>
  )
}
