import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'
import { useEffect, useState } from 'react'
import { createCalendarDays } from 'routes/Signup/Components/Calendar/utils/createDaysUtils'
import { DeliveryDay } from 'routes/Signup/Components/Calendar/models/DeliveryDay'
import { useDeliveryDaysMap } from 'routes/Signup/Components/Calendar/hooks/useDeliveryDaysMap'
import moment from 'moment'

const DELIVERY_DAY_FORMAT = 'YYYY-MM-DD'

/**
 * Returns calendar days info ready to be displayed via <CalendarDay />.
 * @param weeksInCalendar - amount of weeks represented by calendar.
 * @param deliveryDays - delivery days info.
 * @param selectedDate - selected date on calendar.
 */
export const useCalendarDays = (
  weeksInCalendar: number,
  deliveryDays: DeliveryDay[],
  selectedDate: DeliveryDay['date'],
): Array<CalendarDayInfo> => {
  const deliveryDaysMap = useDeliveryDaysMap(deliveryDays)
  const [calendarDays, setCalendarDays] = useState([] as Array<CalendarDayInfo>)
  useEffect(() => {
    const selectedDay = moment(selectedDate, DELIVERY_DAY_FORMAT)
    setCalendarDays(
      createCalendarDays(weeksInCalendar).map((day) => {
        const calendarDay = { ...day }
        const associatedDeliveryDay = deliveryDaysMap.get(
          calendarDay.date.format(DELIVERY_DAY_FORMAT),
        )
        if (associatedDeliveryDay) {
          calendarDay.isSelected = calendarDay.date.diff(selectedDay, 'days') === 0
          calendarDay.isDeliveryDay = !associatedDeliveryDay.disabled
        } // else do nothing; day would be disabled for delivery by default

        return calendarDay
      }),
    )
  }, [weeksInCalendar, deliveryDaysMap, selectedDate])

  return calendarDays
}
