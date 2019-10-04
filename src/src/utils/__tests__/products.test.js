import Immutable from 'immutable'
import { getCategoriesFromProducts } from '../products'

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
        'productId1': {
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
        'productId2': {
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
          'categoryId1': {
            id: 'categoryId1',
            label: 'Category 1',
            count: 1,
          },
          'categoryId2': {
            id: 'categoryId2',
            label: 'Category 2',
            count: 1,
          },
          'categoryId3': {
            id: 'categoryId3',
            label: 'Category 3',
            count: 1,
          }
        })
      })
    })

    describe('and categories are hidden', () => {
      let productsWithHiddenCategory

      beforeEach(() =>{
        productsWithHiddenCategory = products.setIn(['productId2', 'categories', 0, 'hidden'], true)
      })

      test('ignores hidden categories', () => {
        expect(getCategoriesFromProducts(productsWithHiddenCategory)).toEqual({
          ...allProductsCategory(productsWithHiddenCategory),
          'categoryId1': {
            id: 'categoryId1',
            label: 'Category 1',
            count: 1,
          },
          'categoryId3': {
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
          'categoryId1': {
            id: 'categoryId1',
            label: 'Category 1',
            count: 1,
          },
          'categoryId2': {
            id: 'categoryId2',
            label: 'Category 2',
            count: 2,
          }
        })
      })
    })
  })
})
