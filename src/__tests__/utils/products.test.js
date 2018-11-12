import Immutable from 'immutable' /* eslint-disable new-cap */

import productUtils from 'utils/products'

describe('utils/products', () => {
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
      let foundProducts = productUtils.getProductsByCutoff('date-1', products)
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

      foundProducts = productUtils.getProductsByCutoff('date-3', products)
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
      const foundProducts = productUtils.getProductsByCutoff('date-5', products)

      expect(Immutable.is(foundProducts, Immutable.List())).toBe(true)
    })
  })
})
