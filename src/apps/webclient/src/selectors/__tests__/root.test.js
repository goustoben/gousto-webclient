import { getProductCategories, getMenuBrowseCTAShow } from '../root'

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

  describe('getMenuBrowseCTAShow', () => {
    test('should return the menuBrowseCTAShow value', () => {
      const state = {
        menuBrowseCTAShow: true
      }

      expect(getMenuBrowseCTAShow(state)).toEqual(true)
    })
  })
})
