import moment from 'moment'

import { getUpcomingFridayInclusive, getPrecedingSaturdayInclusive } from './findWeekday'

const formatDate = (dateMoment) => dateMoment.format('YYYY-MM-DD')

describe('getUpcomingFridayInclusive', () => {
  describe('when day is friday', () => {
    const date = moment('2021-01-08')

    test('should return the same day', () => {
      const result = getUpcomingFridayInclusive(date)

      expect(formatDate(result)).toEqual(formatDate(date))
    })
  })

  describe('when day is sunday', () => {
    const date = moment('2021-01-10')

    test('should return the next friday', () => {
      const result = getUpcomingFridayInclusive(date)

      expect(formatDate(result)).toEqual(formatDate(moment('2021-01-15')))
    })
  })

  describe('when day is thursday', () => {
    const date = moment('2021-01-14')

    test('should return the next day', () => {
      const result = getUpcomingFridayInclusive(date)

      expect(formatDate(result)).toEqual(formatDate(moment('2021-01-15')))
    })
  })
})

describe('getPrecedingSaturdayInclusive', () => {
  describe('when day is saturday', () => {
    const date = moment('2021-01-02')

    test('should return the same day', () => {
      const result = getPrecedingSaturdayInclusive(date)

      expect(formatDate(result)).toEqual(formatDate(date))
    })
  })

  describe('when day is sunday', () => {
    const date = moment('2021-01-03')

    test('should return the previous day', () => {
      const result = getPrecedingSaturdayInclusive(date)

      expect(formatDate(result)).toEqual(formatDate(moment('2021-01-02')))
    })
  })

  describe('when day is friday', () => {
    const date = moment('2021-01-08')

    test('should return the previous saturday', () => {
      const result = getPrecedingSaturdayInclusive(date)

      expect(formatDate(result)).toEqual(formatDate(moment('2021-01-02')))
    })
  })
})
