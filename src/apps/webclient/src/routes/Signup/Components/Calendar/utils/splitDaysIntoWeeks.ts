import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'

/**
 * Returns array of weeks. Week is an array of 7 CalendarDayInfo elements.
 */
export const splitDaysIntoWeeks = (
  weeksAmount: number,
  calendarDays: CalendarDayInfo[],
): CalendarDayInfo[][] => {
  const weeks = new Array(weeksAmount).fill(null).map(() => [] as CalendarDayInfo[])
  calendarDays.forEach((day, index) => weeks[Math.trunc(index / 7)]?.push(day))
  /**
   * If last week has no delivery days, remove it from calendar.
   */
  if (!weeks[weeksAmount - 1].some((day) => day.isDeliveryDay)) {
    weeks.splice(weeksAmount - 1)
  }

  return weeks
}
