import { getProductCategories } from '../root'

describe('root selectors', () => {

  describe('getProductCategories', () => {
    test('should return the "productCategories" attribute', () => {
      const state = {
        productsCategories: {}
      }

      expect(getProductCategories(state)).toEqual({})
    })
  })
})
