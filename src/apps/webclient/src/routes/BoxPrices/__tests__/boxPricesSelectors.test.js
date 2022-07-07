import Immutable from 'immutable'

import {
  getPricePerServing,
  getMenuBoxPrices,
  getNumPersonsToBoxDescriptors,
} from '../boxPricesSelectors'
import menuBoxPrices from './__mocks__/menuBoxPrices.json'

// FYI: this will remove after 5 recipes experiment
jest.mock('routes/BoxPrices/boxPricesConfig', () => ({
  numPersonsValues: ['2', '4'],
  numPortionsValues: ['2', '3', '4'],
}))

describe('boxPricesSelectors', () => {
  let state

  describe('given getMenuBoxPrices is called', () => {
    beforeEach(() => {
      state = {
        menuBoxPrices: 'box prices object',
      }
    })

    test('then it should return menuBoxPrices', () => {
      expect(getMenuBoxPrices(state)).toEqual('box prices object')
    })
  })

  describe('given getNumPersonsToBoxDescriptors is called', () => {
    describe('when menuBoxPrices is not loaded yet', () => {
      beforeEach(() => {
        state = {
          menuBoxPrices: null,
        }
      })

      test('then it should return null', () => {
        const result = getNumPersonsToBoxDescriptors(state)
        expect(result).toBeNull()
      })
    })

    describe('when menuBoxPrices exists', () => {
      beforeEach(() => {
        state = {
          menuBoxPrices: Immutable.fromJS(menuBoxPrices),
        }
      })

      test('then it should extract and group correct information', () => {
        const result = getNumPersonsToBoxDescriptors(state)

        const expected = {
          2: [
            {
              num_portions: 2,
              price_per_portion: '6.25',
              total: '24.99',
              totalAfterDiscount: '12.50',
            },
            {
              num_portions: 3,
              price_per_portion: '5.00',
              total: '29.99',
              totalAfterDiscount: '15.00',
            },
            {
              num_portions: 4,
              price_per_portion: '4.37',
              total: '34.99',
              totalAfterDiscount: '17.50',
            },
          ],
          4: [
            {
              num_portions: 2,
              price_per_portion: '3.97',
              total: '31.75',
              totalAfterDiscount: '15.88',
            },
            {
              num_portions: 3,
              price_per_portion: '3.56',
              total: '42.75',
              totalAfterDiscount: '21.38',
            },
            {
              num_portions: 4,
              price_per_portion: '2.98',
              total: '47.75',
              totalAfterDiscount: '23.88',
            },
          ],
        }
        expect(result).toStrictEqual(expected)
      })
    })
  })

  describe('given getPricePerServing is called', () => {
    describe('when menuBoxPrices is not loaded yet', () => {
      beforeEach(() => {
        state = {
          menuBoxPrices: null,
        }
      })

      test('then it should return null', () => {
        const result = getPricePerServing(state)
        expect(result).toBeNull()
      })
    })

    describe('when menuBoxPrices exists', () => {
      beforeEach(() => {
        state = {
          menuBoxPrices: Immutable.fromJS(menuBoxPrices),
        }
      })

      test('then it should extract correct information', () => {
        const result = getPricePerServing(state)
        expect(result).toBe('2.98')
      })
    })
  })
})
