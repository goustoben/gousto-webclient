import moment from 'moment'

import {
  createCalendarDays,
  getCalendarWeekDay,
} from 'routes/Signup/Components/Calendar/utils/createDaysUtils'

jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-15', 'YYYY-MM-DD'))

describe('createDaysUtils', () => {
  describe('getCalendarWeekDay', () => {
    test('should return 0 for Monday weekday', () => {
      const monday = moment().subtract(2, 'days')
      expect(getCalendarWeekDay(monday.weekday())).toEqual(0)
    })
    test('should return 6 for Sunday weekday', () => {
      const sunday = moment().add(4, 'days')
      expect(getCalendarWeekDay(sunday.weekday())).toEqual(6)
    })
  })

  describe('createCalendarDays', () => {
    test('should create calendar days', () => {
      const expectedDays = [
        {
          date: moment().subtract(2, 'days'),
          isBeforeTodayDate: true,
          isSelected: false,
          isToday: false,
          isDeliveryDay: false,
        },
        {
          date: moment().subtract(1, 'days'),
          isBeforeTodayDate: true,
          isSelected: false,
          isToday: false,
          isDeliveryDay: false,
        },
        {
          date: moment(),
          isBeforeTodayDate: false,
          isSelected: false,
          isToday: true,
          isDeliveryDay: false,
        },
        {
          date: moment().add(1, 'days'),
          isBeforeTodayDate: false,
          isSelected: false,
          isToday: false,
          isDeliveryDay: false,
        },
        {
          date: moment().add(2, 'days'),
          isBeforeTodayDate: false,
          isSelected: false,
          isToday: false,
          isDeliveryDay: false,
        },
        {
          date: moment().add(3, 'days'),
          isBeforeTodayDate: false,
          isSelected: false,
          isToday: false,
          isDeliveryDay: false,
        },
        {
          date: moment().add(4, 'days'),
          isBeforeTodayDate: false,
          isSelected: false,
          isToday: false,
          isDeliveryDay: false,
        },
      ]
      const actualDays = createCalendarDays(1)
      expect(actualDays).toEqual(expectedDays)
    })
  })
})
