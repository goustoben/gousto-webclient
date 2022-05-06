import { getCalendarDates } from './getCalendarDates'

const buildDate = (date, disabled = false) => ({
  date,
  value: date,
  disabled,
  icon: '',
  orderId: '',
})

const WEEK_A_DATES = [
  buildDate('2021-01-09'), // Saturday
  buildDate('2021-01-10'),
  buildDate('2021-01-11'),
  buildDate('2021-01-12'),
  buildDate('2021-01-13'),
  buildDate('2021-01-14'),
  buildDate('2021-01-15'), // Friday
]

const WEEK_B_DATES = [
  buildDate('2021-01-16'), // Saturday
  buildDate('2021-01-17'),
  buildDate('2021-01-18'),
  buildDate('2021-01-19'),
  buildDate('2021-01-20'),
  buildDate('2021-01-21'),
  buildDate('2021-01-22'), // Friday
]

const WEEK_C_DATES = [
  buildDate('2021-01-23'), // Saturday
  buildDate('2021-01-24'),
  buildDate('2021-01-25'),
  buildDate('2021-01-26'),
  buildDate('2021-01-27'),
  buildDate('2021-01-28'),
  buildDate('2021-01-29'), // Friday
]

describe('getCalendarDates', () => {
  let dates

  // functions for reusable tests
  const testShouldReturnOneWeek = () =>
    test('should return calendar saturday - friday (1 week)', () => {
      const { start, finish } = getCalendarDates(dates)

      expect(start).toEqual('2021-01-09')
      expect(finish).toEqual('2021-01-15')
    })

  const testShouldReturnTwoWeeks = () =>
    test('should return calendar saturday - friday (2 weeks)', () => {
      const { start, finish } = getCalendarDates(dates)

      expect(start).toEqual('2021-01-09')
      expect(finish).toEqual('2021-01-22')
    })

  const testShouldReturnThreeWeeks = () =>
    test('should return calendar saturday - friday (3 weeks)', () => {
      const { start, finish } = getCalendarDates(dates)

      expect(start).toEqual('2021-01-09')
      expect(finish).toEqual('2021-01-29')
    })

  describe('when first available delivery date is a saturday', () => {
    describe('and last available delivery date is the following friday (6 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES]
      })

      testShouldReturnOneWeek()
    })

    describe('and there 1 week of available dates and 1 week of disabled dates (13 days later)', () => {
      const WEEK_B_DATES_DISABLED = WEEK_B_DATES.map((date) => ({ ...date, disabled: true }))

      beforeEach(() => {
        dates = [...WEEK_A_DATES, ...WEEK_B_DATES_DISABLED]
      })

      testShouldReturnOneWeek()
    })

    describe('and last available delivery date is the second following friday (13 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES, ...WEEK_B_DATES]
      })

      testShouldReturnTwoWeeks()
    })

    describe('and last available delivery date is the third following friday (20 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES, ...WEEK_B_DATES, ...WEEK_C_DATES]
      })

      testShouldReturnThreeWeeks()
    })
  })

  describe('when first available delivery date is a sunday', () => {
    // saturday is the 0th item
    const WEEK_A_DATES_WITH_SATURDAY_DISABLED = WEEK_A_DATES.map((value, index) =>
      index === 0 ? { ...value, disabled: true } : value,
    )

    describe('and last available delivery date is the next friday (5 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES_WITH_SATURDAY_DISABLED]
      })

      testShouldReturnOneWeek()
    })

    describe('and last available delivery date is the second following friday (12 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES_WITH_SATURDAY_DISABLED, ...WEEK_B_DATES]
      })

      testShouldReturnTwoWeeks()
    })

    describe('and last available delivery date is the third following friday (19 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES_WITH_SATURDAY_DISABLED, ...WEEK_B_DATES, ...WEEK_C_DATES]
      })

      testShouldReturnThreeWeeks()
    })
  })

  describe('when first available delivery date is a wednesday', () => {
    // wednesday is the 4th item
    const WEEK_A_DATES_DISABLED_UNTIL_WEDNESDAY = WEEK_A_DATES.map((value, index) =>
      index < 4 ? { ...value, disabled: true } : value,
    )

    describe('and last available delivery date is the next friday (2 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES_DISABLED_UNTIL_WEDNESDAY]
      })

      testShouldReturnOneWeek()
    })

    describe('and last available delivery date is the second following friday (9 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES_DISABLED_UNTIL_WEDNESDAY, ...WEEK_B_DATES]
      })

      testShouldReturnTwoWeeks()
    })

    describe('and last available delivery date is the third following friday (16 days later)', () => {
      beforeEach(() => {
        dates = [...WEEK_A_DATES_DISABLED_UNTIL_WEDNESDAY, ...WEEK_B_DATES, ...WEEK_C_DATES]
      })

      testShouldReturnThreeWeeks()
    })
  })
})
