import { OrderedMap, fromJS } from 'immutable'
import * as productUtils from 'utils/products'
import {
  getProducts,
  getDesserts,
  getCategoriesForNavBar,
  getProductsForMarket,
  getProductsInStock,
  getProductsOutOfStock,
} from '../products'

const createOrderedMap = targetObject => (
  OrderedMap(fromJS(targetObject))
)

describe('the products selectors', () => {
  const products = createOrderedMap({
    'product1': {
      title: 'First product',
      id: 'product1',
      stock: 1,
    },
    'product2': {
      title: 'Second product',
      id: 'product2',
      stock: -1,
    },
    'product3': {
      title: 'Third product',
      id: 'product3',
      stock: 0,
    },
    'product4': {
      title: 'Fourth product',
      id: 'product4',
      stock: 5,
    },
    'product5': {
      title: 'Fourth product',
      id: 'product5',
      stock: 0,
    },
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

  describe('the getProductsInStock selector', () => {
    test('returns only products that are in stock', () => {
      expect(getProductsInStock(store)).toEqual(
        createOrderedMap({
          'product1': {
            title: 'First product',
            id: 'product1',
            stock: 1,
          },
          'product4': {
            title: 'Fourth product',
            id: 'product4',
            stock: 5,
          },
        })
      )
    })
  })

  describe('the getProductsOutOfStock selector', () => {
    test('returns only products that are out of stock', () => {
      expect(getProductsOutOfStock(store)).toEqual(
        createOrderedMap({
          'product2': {
            title: 'Second product',
            id: 'product2',
            stock: -1,
          },
          'product3': {
            title: 'Third product',
            id: 'product3',
            stock: 0,
          },
          'product5': {
            title: 'Fourth product',
            id: 'product5',
            stock: 0,
          },
        })
      )
    })
  })

  describe('the getProductsForMarket selector', () => {
    const expectedResult = {
      'product1': {
        title: 'First product',
        id: 'product1',
        stock: 1,
      },
      'product4': {
        title: 'Fourth product',
        id: 'product4',
        stock: 5,
      },
      'product2': {
        title: 'Second product',
        id: 'product2',
        stock: -1,
      },
      'product3': {
        title: 'Third product',
        id: 'product3',
        stock: 0,
      },
      'product5': {
        title: 'Fourth product',
        id: 'product5',
        stock: 0,
      },
    }

    test('returns a JS object', () => {
      const result = getProductsForMarket(store)
      expect(result).toEqual(expectedResult)
    })

    test('returns the object in the correct order with out of stock products at the bottom', () => {
      const result = getProductsForMarket(store)
      expect(Object.keys(result).join(',')).toBe(
        Object.keys(expectedResult).join(',')
      )
    })
  })

  describe('the getDesserts selector', () => {
    test('products are returned with desserts only', () => {
      const productsWithCategories = createOrderedMap({
        'product6': {
          title: 'Sixth product',
          id: 'product6',
          stock: 1,
          categories: [{ id: 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9' }]
        },
        'product7': {
          title: 'Seventh product',
          id: 'product7',
          stock: 1,
          categories: [{ id: 'not-a-dessert' }]
        },
      })
      expect(getDesserts({ products: productsWithCategories })).toEqual(
        {
          product6: {
            id: 'product6',
            stock: 1,
            title: 'Sixth product',
            categories: [{
              id: 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9'
            }],
          }}
      )
    })
  })
})
