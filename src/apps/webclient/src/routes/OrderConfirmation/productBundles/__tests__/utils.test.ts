import { dateToMenuWeek, getBundles } from '../utils'

jest.mock('../bundles', () => ({
  bundles: [
    {
      menuWeek: '516',
      bundles: [{ id: '123' }],
    },
    {
      menuWeek: '517',
      bundles: [{ id: '456' }],
    },
  ],
}))

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
      ['2022-06-14T11:00:00Z', [{ id: '123' }]],
      ['2022-06-21T11:00:00Z', [{ id: '456' }]],
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
