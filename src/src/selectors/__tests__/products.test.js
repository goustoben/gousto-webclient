import Immutable from 'immutable'
import * as productUtils from 'utils/products'
import { getProducts, getCategoriesForNavBar } from '../products'

describe('the products selectors', () => {
  const products = Immutable.fromJS({
    'product1': {
      title: 'First product',
      id: 'product1',
    },
    'product2': {
      title: 'Second product',
      id: 'product2',
    }
  })
  let store

  beforeEach(() => {
    store = {
      products,
    }
  })

  describe('the getProducts selector', () => {
    test('returns products from the store', () => {
      expect(getProducts(store)).toEqual(products)
    })
  })

  describe('the getCategoriesForNavBar selector', () => {
    test('calls the getCategoriesFromProducts utility function', () => {
      const getCategoriesFromProductsMock = productUtils.getCategoriesFromProducts = jest.fn()
      getCategoriesForNavBar.resultFunc(products)
      expect(getCategoriesFromProductsMock).toHaveBeenCalledWith(products)
    })
  })
})
