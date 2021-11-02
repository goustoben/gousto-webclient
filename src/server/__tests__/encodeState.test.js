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
    const expected = JSON.stringify([
      {
        tag: 'isObject',
        items: {
          form: {},
        }
      },
      {
        tag: 'isPlain',
        items: {
          serverError: '404'
        }
      },
      {
        tag: 'isMap',
        items: {
          payment: {
            tag: 'isMap',
            value: {
              challengeUrl: {
                tag: 'isPlain',
                value: null
              },
              isModalVisible: {
                tag: 'isPlain',
                value: false
              },
              paymentMethod: {
                tag: 'isPlain',
                value: 'Card'
              }
            }
          }
        }
      },
      {
        tag: 'isOrderedMap',
        items: {
          menuCollections: {},
        }
      },
      {
        tag: 'isArray',
        items: {},
      },
      {
        tag: 'isList',
        items: {}
      },
    ])

    expect(serialised).toEqual(expected)
  })
})
