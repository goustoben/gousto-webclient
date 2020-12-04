import { isCoreRequestSuccessful } from '../response'

describe('isCoreRequestSuccessful', () => {
  describe('Given no response is received', () => {
    test('Then false is returned', () => {
      expect(isCoreRequestSuccessful()).toEqual(false)
    })
  })

  describe('Given response has no status key', () => {
    test('Then false is returned', () => {
      expect(isCoreRequestSuccessful({ foo: 123 })).toEqual(false)
    })
  })

  describe('Given response is properly formed', () => {
    describe('And the response is successful', () => {
      test('Then false is returned', () => {
        expect(isCoreRequestSuccessful({ status: 'error' })).toEqual(false)
      })
    })

    describe('And the response is unsuccessful', () => {
      test('Then true is returned', () => {
        expect(isCoreRequestSuccessful({ status: 'ok' })).toEqual(true)
      })
    })
  })
})
