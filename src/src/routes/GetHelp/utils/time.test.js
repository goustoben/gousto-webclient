import MockDate from 'mockdate'
import { compareTodayToDeliveryDate } from './time'

describe('GetHelp time util', () => {
  describe('Given compareTodayToDeliveryDate', () => {
    const CASES = [
      ['2020-03-05 00:00:00', 'on'],
      ['2020-03-05 23:59:59', 'on'],
      ['1715-05-20 00:00:00', 'after'],
      ['2020-03-04 23:59:59', 'after'],
      ['2020-02-06 00:00:00', 'after'],
      ['3000-01-01 00:00:00', 'before'],
      ['2020-03-06 00:00:00', 'before'],
      ['2020-04-01 00:00:00', 'before'],
    ]

    beforeAll(() => {
      // This represents Today - now
      MockDate.set('2020-03-05 14:14:14')
    })

    afterAll(() => {
      MockDate.reset()
    })

    test.each(CASES)('is called with %s it returns %s', (deliveryDate, result) => {
      expect(compareTodayToDeliveryDate(deliveryDate)).toBe(result)
    })
  })
})
