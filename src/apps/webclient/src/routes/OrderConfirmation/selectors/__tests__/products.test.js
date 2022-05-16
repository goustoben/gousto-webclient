import { getProductsStock } from '../products'
import { mockProductsStock } from '../../components/config'

describe('products selectors', () => {
  let state

  beforeEach(() => {
    state = {
      productsStock: mockProductsStock
    }
  })

  describe('productsStock', () => {
    test('should return productStock', () => {
      const result = getProductsStock(state)

      expect(result).toEqual(mockProductsStock)
    })
  })
})
