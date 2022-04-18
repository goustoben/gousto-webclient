import moment from 'moment'
import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'

/**
 * Transforms week day in calendar convention week day; by design requirement week starts from monday.
 * @param weekDayIndex - week day to transform in calendar week day convention.
 */
export const getCalendarWeekDay = (weekDayIndex: number): number =>
  weekDayIndex === 0 ? 6 : weekDayIndex - 1

/**
 * Creates blank days that are preceding "today" day.
 */
const createBlankDays = (): Array<CalendarDayInfo> => {
  const todayDayIndex = getCalendarWeekDay(moment().weekday())

  return new Array(todayDayIndex).fill(0).map((_, index) => ({
    date: moment()
      .startOf('day')
      .subtract(todayDayIndex - index, 'days'),
    isBeforeTodayDate: true,
    isSelected: false,
    isToday: false,
    isDeliveryDay: false,
  }))
}

/**
 * Creates days from today to the end of week.
 */
const createWeekDaysFromToday = (): Array<CalendarDayInfo> => {
  const todayDayIndex = getCalendarWeekDay(moment().weekday())

  return new Array(7 - todayDayIndex).fill(0).map((_, index) => ({
    date: moment().startOf('day').add(index, 'days'),
    isBeforeTodayDate: false,
    isSelected: false,
    isToday: index === 0,
    isDeliveryDay: false,
  }))
}

/**
 * Creates today's (current) week days.
 */
const createCurrentWeekDays = (): Array<CalendarDayInfo> =>
  createBlankDays().concat(createWeekDaysFromToday())

/**
 * Creates days going after current week up to specified weeksAmount.
 */
const createDaysAfterCurrentWeek = (weeksAmount: number): Array<CalendarDayInfo> => {
  const todayDayIndex = getCalendarWeekDay(moment().weekday())

  return new Array(weeksAmount * 7).fill(0).map((_, index) => ({
    date: moment()
      .startOf('day')
      .add(7 - todayDayIndex + index, 'days'),
    isBeforeTodayDate: false,
    isSelected: false,
    isToday: false,
    isDeliveryDay: false,
  }))
}

/**
 * Creates all days for calendar to display. Single day is represented as CalendarDayInfo model.
 */
export const createCalendarDays = (weeksInCalendar: number): Array<CalendarDayInfo> =>
  createCurrentWeekDays().concat(createDaysAfterCurrentWeek(weeksInCalendar - 1))
