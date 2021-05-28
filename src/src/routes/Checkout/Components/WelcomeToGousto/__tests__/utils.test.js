import { isValidDate, transformSubHeadDate } from '../utils'

describe('delivery utils', () => {
  describe('given isValidDate', () => {
    let output

    describe('when date is not valid', () => {
      beforeEach(() => {
        output = isValidDate()
      })

      test('then should return false', () => {
        expect(output).toBeFalsy()
      })
    })

    describe('when date is valid', () => {
      beforeEach(() => {
        output = isValidDate('25-04-2021')
      })

      test('then should return true', () => {
        expect(output).toBeTruthy()
      })
    })
  })

  describe('given transformSubHeadDate', () => {
    let output

    describe('when transformSubHeadDate is called', () => {
      beforeEach(() => {
        output = transformSubHeadDate('25-04-2021')
      })

      test('then date should be transformed', () => {
        expect(output).toBe('Sunday 20th April')
      })
    })
  })
})
