import { splitDaysIntoWeeks } from 'routes/Signup/Components/Calendar/utils/splitDaysIntoWeeks'
import moment from 'moment'

const DELIVERY_DAY_FORMAT = 'YYYY-MM-DD'
jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-15', DELIVERY_DAY_FORMAT))

const sampleDay = {
  date: moment(),
  isBeforeTodayDate: true,
  isSelected: false,
  isToday: false,
  isDeliveryDay: true,
}

describe('splitDaysIntoWeeks util', () => {
  test('should split calendar days into weeks', () => {
    const daysAmount = 25
    const weeksAmount = 4
    const actualWeeks = splitDaysIntoWeeks(weeksAmount, new Array(daysAmount).fill(sampleDay))
    expect(actualWeeks.length).toEqual(weeksAmount)
    // tail length verification
    expect(actualWeeks[weeksAmount - 1].length).toEqual(daysAmount % 7)
  })

  test('should remove last week if it has no deliveryDays', () => {
    const daysAmount = 25
    const weeksAmount = 4
    const actualWeeks = splitDaysIntoWeeks(
      weeksAmount,
      new Array(daysAmount).fill({
        ...sampleDay,
        isDeliveryDay: false,
      })
    )
    expect(actualWeeks.length).toEqual(weeksAmount - 1)
    // tail length verification
    expect(actualWeeks[weeksAmount - 2].length).toEqual(7)
  })
})
