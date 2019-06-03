import { getCutoffDate } from '../MenuContainer'

describe('MenuContainer', () => {
  describe('getCutoffDate', () => {
    describe('when passing a valid date', () => {
      test('the date returned is 3 days earlier than the date passed to it', () => {
        expect(getCutoffDate('2019-06-10')).toBe('07-06-2019 12:00:00')
      })
    })

    describe('when passing an invalid date', () => {
      test('the date returned is an empty string', () => {
        expect(getCutoffDate('')).toBe('')
      })
    })
  })
})
