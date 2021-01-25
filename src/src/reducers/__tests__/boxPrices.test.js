import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { boxPrices } from 'reducers/boxPrices'

describe('box prices reducers', () => {
  test('initial state', () => {
    const expected = Immutable.Map({
      pricePerServing: '2.87',
    })

    const result = boxPrices.boxPrices(undefined, {})

    expect(Immutable.is(result, expected)).toBe(true)
  })

  describe('given BOXPRICE_SET_PRICE_PER_SERVING action type', () => {
    describe('when called', () => {
      test('then pricePerServing set price value', () => {
        const result = boxPrices.boxPrices(undefined, {
          type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
          price: '1.12'
        })

        expect(result.get('pricePerServing')).toEqual('1.12')
      })
    })
  })
})
