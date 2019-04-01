import { getProductCategories } from '../root'

describe('root selectors', () => {

  describe('getProductCategories', () => {
    test('should return the "productCategories" attribute', () => {
      const state = {
        productsCategories: {
          id: '1234'
        }
      }

      expect(getProductCategories(state)).toEqual({id: '1234'})
    })
  })
})
