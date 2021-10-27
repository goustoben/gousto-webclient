import Immutable from 'immutable'
import { PaymentMethod } from 'config/signup'

const encodeState = require('server/encodeState')

describe('encodeState', () => {
  test('should serialise state tree', () => {
    const state = {
      form: {},
      serverError: '404',
      payment: Immutable.Map({
        challengeUrl: null,
        isModalVisible: false,
        paymentMethod: PaymentMethod.Card,
      }),
      menuCollections: Immutable.OrderedMap(),
    }

    const serialised = encodeState(state)
    const expected = JSON.stringify({
      form: {
        type: 'plain',
        value: {}
      },
      serverError: {
        type: 'plain',
        value: '404',
      },
      payment: {
        type: 'isMap',
        value: {
          challengeUrl: null,
          isModalVisible: false,
          paymentMethod: PaymentMethod.Card,
        },
      },
      menuCollections: {
        type: 'isOrderedMap',
        value: {},
      },
    })

    expect(serialised).toEqual(expected)
  })
})
