import { hasPropUpdated } from 'utils/react'

describe('hasPropUpdated', () => {
  describe('when prop is false', () => {
    test('should return false', () => {
      expect(hasPropUpdated(false, true)).toEqual(false)
    })
  })

  describe('when prop is true', () => {
    describe('and has updated from false', () => {
      test('should return true', () => {
        expect(hasPropUpdated(true, false)).toEqual(true)
      })
    })

    describe('and has not updated', () => {
      test('should return false', () => {
        expect(hasPropUpdated(true, true)).toEqual(false)
      })
    })
  })
})
