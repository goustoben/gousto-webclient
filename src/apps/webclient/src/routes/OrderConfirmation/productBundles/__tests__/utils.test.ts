import { bundles } from '../bundles'
import { dateToMenuWeek, getBundles } from '../utils'

describe('Product Bundles Utils', () => {
  describe('dateToMenuWeek', () => {
    const cases = [
      ['2022-06-14T11:00:00Z', '516'],
      ['2022-06-21T11:00:00Z', '517'],
      ['2022-06-28T11:00:00Z', '518'],
      ['2022-07-05T11:00:00Z', '519'],
      ['2022-07-12T11:00:00Z', '520'],
      ['2022-07-19T11:00:00Z', '521'],
      ['2023-07-19T11:00:00Z', ''],
      ['', ''],
    ]
    test.each(cases)('given %p is argument, returns %p, ', (menuWeekStart, expectedResult) => {
      expect(dateToMenuWeek(menuWeekStart)).toEqual(expectedResult)
    })
  })

  describe('getBundles', () => {
    const cases = [
      ['2022-06-14T11:00:00Z', [...bundles[0].bundles]],
      ['2022-06-21T11:00:00Z', [...bundles[1].bundles]],
      ['2022-06-28T11:00:00Z', [...bundles[2].bundles]],
      ['2022-07-05T11:00:00Z', [...bundles[3].bundles]],
      ['2022-07-12T11:00:00Z', [...bundles[4].bundles]],
      ['2022-07-19T11:00:00Z', [...bundles[5].bundles]],
      ['2022-06-23T11:00:00Z', []],
      ['', []],
    ]

    test.each(cases)(
      'given %p is the argument, returns bundle data',
      (menuWeekStart, expectedResult) => {
        expect(getBundles(menuWeekStart as string)).toEqual(expectedResult)
      },
    )
  })
})
