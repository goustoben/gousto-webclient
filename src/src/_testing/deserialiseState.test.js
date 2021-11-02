import Immutable from 'immutable'
import { PaymentMethod } from 'config/signup'
import { deserialise } from '../deserialiseState'

describe('deserialise', () => {
  test('should deserialise state tree properly', () => {
    const initialState = [
      {
        tag: 'isObject',
        items: {
          form: {},
          routing: {
            locationBeforeTransition: {
              tag: 'isObject',
              value: {
                action: {
                  tag: 'isPlain',
                  value: 'POP',
                },
                key: {
                  tag: 'isPlain',
                  value: null,
                },
                state: {
                  tag: 'isPlain',
                },
              },
            },
          },
        },
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
          },
          experiments: {
            tag: 'isMap',
            value: {
              experiments: {
                tag: 'isMap',
                value: {}
              },
              fetchedExperiments: {
                tag: 'isPlain',
                value: false,
              }
            },
          },
        }
      },
      {
        tag: 'isOrderedMap',
        items: {
          menuCollections: {},
        },
      },
      {
        tag: 'isArray',
        items: {},
      },
      {
        tag: 'isList',
        items: {
          menuRecipes: [],
        },
      },
      {
        tag: 'unknown',
        items: {
          blabla: {},
        },
      },
    ]
    const deserialisedState = deserialise(initialState)
    const expected = {
      form: {},
      routing: {
        locationBeforeTransition: {
          action: 'POP',
          key: null,
          state: undefined,
        },
      },
      serverError: '404',
      payment: Immutable.Map({
        challengeUrl: null,
        isModalVisible: false,
        paymentMethod: PaymentMethod.Card,
      }),
      menuCollections: Immutable.OrderedMap(),
      experiments: Immutable.Map({
        experiments: Immutable.Map({}),
        fetchedExperiments: false,
      }),
      menuRecipes: Immutable.List([]),
      blabla: Immutable.Map({}),
    }

    expect(deserialisedState).toEqual(expected)
  })
})
