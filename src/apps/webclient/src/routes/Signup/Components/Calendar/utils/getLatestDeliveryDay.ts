import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'

/**
 * Returns the latest available delivery day on calendar.
 * Note: returns calendarDays[0] if calendar has no delivery days, but that scenario is not expected to happen in app.
 * @param calendarDays - all days on calendar.
 */
export const getLatestDeliveryDay = (calendarDays: CalendarDayInfo[]): CalendarDayInfo | null =>
  calendarDays.reduce(
    (latestDay, currentDay) =>
      currentDay.isDeliveryDay && currentDay.date.diff(latestDay.date, 'days') > 0
        ? currentDay
        : latestDay,
    calendarDays[0]
  )
