import { getPromoModalVisible } from '../modals'

describe('modals selectors', () => {
  let state = {}

  describe('getPromoModalVisible', () => {
    beforeEach(() => {
      state = {
        promoModalVisible: true
      }
    })

    test('should return promoModalVisible value', () => {
      expect(getPromoModalVisible(state)).toEqual(true)
    })
  })
})
