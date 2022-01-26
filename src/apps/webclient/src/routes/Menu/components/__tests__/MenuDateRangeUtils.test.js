import { getMenuDateRangeText } from '../MenuDateRange/utils'

describe('Given getMenuDateRangeText is called', () => {
  test('When there is no basket date, then it should return a default text', () => {
    expect(getMenuDateRangeText(null)).toBe('Choose Recipes')
    expect(getMenuDateRangeText('')).toBe('Choose Recipes')
  })

  // TG-2065: range starts on Saturday and ends on Friday.

  //   September 2020            October 2020
  // Mo Tu We Th Fr Sa Su     Mo Tu We Th Fr Sa Su
  //     1  2  3  4  5  6               1  2  3  4
  //  7  8  9 10 11 12 13      5  6  7  8  9 10 11
  // 14 15 16 17 18 19 20     12 13 14 15 16 17 18
  // 21 22 23 24 25 26 27     19 20 21 22 23 24 25
  // 28 29 30                 26 27 28 29 30 31
  const cases = [
    { basketDate: '2020-09-26', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-09-27', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-09-28', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-09-29', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-09-30', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-10-01', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-10-02', expectedText: 'Menu for Sep 26 - Oct 02' },
    { basketDate: '2020-10-03', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-04', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-05', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-06', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-07', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-08', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-09', expectedText: 'Menu for Oct 03 - Oct 09' },
    { basketDate: '2020-10-10', expectedText: 'Menu for Oct 10 - Oct 16' },
    // Year end is handled correctly
    { basketDate: '2020-12-28', expectedText: 'Menu for Dec 26 - Jan 01' },
  ]

  describe.each(cases)('When there is a basket date', ({ basketDate, expectedText }) => {
    test(`For ${basketDate}, it should return "${expectedText}"`, () => {
      expect(getMenuDateRangeText(basketDate)).toBe(expectedText)
    })
  })
})
