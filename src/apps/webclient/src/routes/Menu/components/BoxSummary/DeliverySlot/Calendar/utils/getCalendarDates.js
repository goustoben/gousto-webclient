import moment from 'moment'

import { getUpcomingFridayInclusive, getPrecedingSaturdayInclusive } from './findWeekday'

export const getCalendarDates = (deliveryDates) => {
  const enabledDates = deliveryDates.filter((d) => d.disabled !== true)

  const firstDate = moment(enabledDates[0].date)
  const lastDate = moment(enabledDates[enabledDates.length - 1].date)

  const startSaturday = getPrecedingSaturdayInclusive(firstDate)
  const endSaturday = getUpcomingFridayInclusive(lastDate)

  return {
    start: startSaturday.format('YYYY-MM-DD'),
    finish: endSaturday.format('YYYY-MM-DD'),
  }
}
