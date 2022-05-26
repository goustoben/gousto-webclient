import moment from 'moment'

import { CalendarDayInfo } from 'routes/Signup/Components/Calendar/models/CalendarDayInfo'
import { getLatestDeliveryDay } from 'routes/Signup/Components/Calendar/utils/getLatestDeliveryDay'

describe('getLatestDeliveryDay util', () => {
  test('should return latest delivery day', () => {
    const expectedDeliveryDay: CalendarDayInfo = {
      date: moment('2020-10-16'),
      isBeforeTodayDate: true,
      isSelected: false,
      isToday: false,
      isDeliveryDay: true,
    }
    const calendarDays: CalendarDayInfo[] = [
      {
        date: moment('2020-10-15'),
        isBeforeTodayDate: true,
        isSelected: false,
        isToday: false,
        isDeliveryDay: true,
      },
      expectedDeliveryDay,
      {
        date: moment('2020-10-17'),
        isBeforeTodayDate: false,
        isSelected: false,
        isToday: true,
        isDeliveryDay: false,
      },
    ]
    const actualLatestDeliveryDay = getLatestDeliveryDay(calendarDays)
    expect(actualLatestDeliveryDay).toEqual(expectedDeliveryDay)
  })
})
