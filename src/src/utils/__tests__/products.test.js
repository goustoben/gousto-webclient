import Immutable from 'immutable'
import { getProductsByCutoff, getCategoriesFromProducts, sortProductsByPrice } from '../products'

describe('the products utility functions', () => {
  describe('getProductsByCutoff', () => {
    let products

    beforeEach(() => {
      products = Immutable.fromJS({
        1: { id: '1', title: 'Product 1', cutoffDates: ['date-1', 'date-2'] },
        2: { id: '2', title: 'Product 2', cutoffDates: [] },
        3: {
          id: '3',
          title: 'Product 3',
          cutoffDates: ['date-1', 'date-2', 'date-3'],
        },
        4: {
          id: '4',
          title: 'Product 4',
          cutoffDates: ['date-2', 'date-3', 'date-4'],
        },
        5: { id: '5', title: 'Product 5', cutoffDates: ['date-1', 'date-2'] },
        6: { id: '6', title: 'Product 6', cutoffDates: ['date-2'] },
      })
    })

    test('should return products containing requested cutoff date', () => {
      let foundProducts = getProductsByCutoff('date-1', products)
      let expectedResult = Immutable.fromJS([
        { id: '1', title: 'Product 1', cutoffDates: ['date-1', 'date-2'] },
        {
          id: '3',
          title: 'Product 3',
          cutoffDates: ['date-1', 'date-2', 'date-3'],
        },
        { id: '5', title: 'Product 5', cutoffDates: ['date-1', 'date-2'] },
        { id: '6', title: 'Product 6', cutoffDates: ['date-2'] },
      ])

      foundProducts = getProductsByCutoff('date-3', products)
      expectedResult = Immutable.fromJS([
        {
          id: '3',
          title: 'Product 3',
          cutoffDates: ['date-1', 'date-2', 'date-3'],
        },
        {
          id: '4',
          title: 'Product 4',
          cutoffDates: ['date-2', 'date-3', 'date-4'],
        },
      ])
      expect(Immutable.is(foundProducts, expectedResult)).toBe(true)
    })

    test('should return an empty list if no products were found', () => {
      const foundProducts = getProductsByCutoff('date-5', products)

      expect(Immutable.is(foundProducts, Immutable.List())).toBe(true)
    })
  })

  describe('the getCategoriesFromProducts function', () => {
    const allProductsCategory = products => ({
      'all-products': {
        id: 'all-products',
        label: 'All Products',
        count: products.size,
      }
    })
    let products

    describe('when there are no products', () => {
      beforeEach(() => {
        products = Immutable.fromJS({})
      })

      test('returns the all products category with count of zero', () => {
        expect(getCategoriesFromProducts(products)).toEqual({
          ...allProductsCategory(products)
        })
      })
    })

    describe('when there are products', () => {
      beforeEach(() => {
        products = Immutable.fromJS({
          productId1: {
            id: 'productId1',
            title: 'First test product',
            categories: [
              {
                id: 'categoryId1',
                title: 'Category 1',
                hidden: false,
              }
            ]
          },
          productId2: {
            id: 'productId2',
            title: 'Second test product',
            categories: [
              {
                id: 'categoryId2',
                title: 'Category 2',
                hidden: false,
              },
              {
                id: 'categoryId3',
                title: 'Category 3',
                hidden: false,
              }
            ]
          }
        })
      })

      describe('and no categories are hidden', () => {
        test('returns the categories and their counts', () => {
          expect(getCategoriesFromProducts(products)).toEqual({
            ...allProductsCategory(products),
            categoryId1: {
              id: 'categoryId1',
              label: 'Category 1',
              count: 1,
            },
            categoryId2: {
              id: 'categoryId2',
              label: 'Category 2',
              count: 1,
            },
            categoryId3: {
              id: 'categoryId3',
              label: 'Category 3',
              count: 1,
            }
          })
        })
      })

      describe('and categories are hidden', () => {
        let productsWithHiddenCategory

        beforeEach(() => {
          productsWithHiddenCategory = products.setIn(['productId2', 'categories', 0, 'hidden'], true)
        })

        test('ignores hidden categories', () => {
          expect(getCategoriesFromProducts(productsWithHiddenCategory)).toEqual({
            ...allProductsCategory(productsWithHiddenCategory),
            categoryId1: {
              id: 'categoryId1',
              label: 'Category 1',
              count: 1,
            },
            categoryId3: {
              id: 'categoryId3',
              label: 'Category 3',
              count: 1,
            }
          })
        })
      })

      describe('and there are duplicate categories', () => {
        let productsWithDuplicateCategory

        beforeEach(() => {
          productsWithDuplicateCategory = products.setIn(['productId2', 'categories', 1, 'id'], 'categoryId2')
          productsWithDuplicateCategory = productsWithDuplicateCategory.setIn(['productId2', 'categories', 1, 'title'], 'Category 2')
        })

        test('updates category count when duplicate category', () => {
          expect(getCategoriesFromProducts(productsWithDuplicateCategory)).toEqual({
            ...allProductsCategory(productsWithDuplicateCategory),
            categoryId1: {
              id: 'categoryId1',
              label: 'Category 1',
              count: 1,
            },
            categoryId2: {
              id: 'categoryId2',
              label: 'Category 2',
              count: 2,
            }
          })
        })
      })
    })
  })

  describe('the sortProductsByPrice function', () => {
    let products
    beforeEach(() => {
      products = [
        {
          id: 'test-product-1',
          listPrice: '6.00',
        },
        {
          id: 'test-product-1',
          listPrice: '2.00',
        },
        {
          id: 'test-product-1',
          listPrice: '4.50',
        },
        {
          id: 'test-product-1',
          listPrice: '3.00',
        },
      ]
    })

    describe('when there are no free products', () => {
      test('sorts the products in ascending order by price', () => {
        expect(sortProductsByPrice(products)).toEqual([
          {
            id: 'test-product-1',
            listPrice: '2.00',
          },
          {
            id: 'test-product-1',
            listPrice: '3.00',
          },
          {
            id: 'test-product-1',
            listPrice: '4.50',
          },
          {
            id: 'test-product-1',
            listPrice: '6.00',
          },
        ])
      })
    })

    describe('when there are free products', () => {
      let productsWithFreeProduct

      beforeEach(() => {
        productsWithFreeProduct = [
          {
            id: 'test-product-1',
            listPrice: '6.00',
          },
          {
            id: 'test-product-1',
            listPrice: '2.00',
          },
          {
            id: 'test-product-1',
            listPrice: '4.50',
          },
          {
            id: 'free-product-1',
            listPrice: '0.00',
          },
          {
            id: 'test-product-1',
            listPrice: '3.00',
          },
        ]
      })

      test('sorts the products in ascending order by price with free products at the end', () => {
        expect(sortProductsByPrice(productsWithFreeProduct)).toEqual([
          {
            id: 'test-product-1',
            listPrice: '2.00',
          },
          {
            id: 'test-product-1',
            listPrice: '3.00',
          },
          {
            id: 'test-product-1',
            listPrice: '4.50',
          },
          {
            id: 'test-product-1',
            listPrice: '6.00',
          },
          {
            id: 'free-product-1',
            listPrice: '0.00'
          },
        ])
      })

      describe('and there are multiple free products',() => {
        let productsWithMultipleFreeProducts

        beforeEach(() => {
          productsWithMultipleFreeProducts = [...productsWithFreeProduct]
          productsWithMultipleFreeProducts.push({ id: 'free-product-2', listPrice: '0.00' })
          productsWithMultipleFreeProducts.unshift({ id: 'free-product-3', listPrice: '0.00' })
        })

        test('sorts the products in ascending order by price with all free products at the end', () => {
          expect(sortProductsByPrice(productsWithMultipleFreeProducts)).toEqual([
            {
              id: 'test-product-1',
              listPrice: '2.00',
            },
            {
              id: 'test-product-1',
              listPrice: '3.00',
            },
            {
              id: 'test-product-1',
              listPrice: '4.50',
            },
            {
              id: 'test-product-1',
              listPrice: '6.00',
            },
            {
              id: 'free-product-3',
              listPrice: '0.00'
            },
            {
              id: 'free-product-1',
              listPrice: '0.00'
            },
            {
              id: 'free-product-2',
              listPrice: '0.00'
            },
          ])
        })
      })
    })
  })
})
