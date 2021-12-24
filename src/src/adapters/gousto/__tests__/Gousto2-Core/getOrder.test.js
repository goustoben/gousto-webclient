/**
 * @jest-environment ./jest/goustoServiceAdapterTestEnvironment
 */

import { term } from '@pact-foundation/pact/src/dsl/matchers'
import { givenInitialState } from '../__support__/pactUtils'
import { createAdapter } from '../../Gousto2-Core/getOrder'

const timeRegexPattern = '^[0-2]\\d:[0-5]\\d:[0-5]\\d$'

const dateTimeRegexPattern = '^\\d{4}-[0-1]\\d-[0-3]\\d [0-2]\\d:[0-5]\\d:[0-5]\\d$'

describe('Get order', () => {
  let getOrder
  let accessToken

  beforeEach(() => {
    accessToken = 'the-session-access-token'
    getOrder = createAdapter(pact.mockService.baseUrl, () => accessToken)
  })

  test('should get order', async () => {
    await pact.addInteraction(
      givenInitialState({
        recipes: [
          {id: '1111111', uuid: 'recipe-item-1-uuid'},
          {id: '2222222', uuid: 'recipe-item-2-uuid'}
        ],
        orders: [{
          id: '123456789',
          recipeIds: ['1111111', '2222222'],
        }],
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for an order')
        .withRequest({
          method: 'GET',
          path: '/order/123456789',
          headers: {
            Authorization: 'Bearer the-session-access-token',
          }
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': term({
              matcher: 'application/json',
              generate: 'application/json',
            })
          },
          body: {
            status: 'ok',
            result: {
              data: {
                id: '123456789',
                recipe_items: [
                  {recipe_id: '1111111', recipe_uuid: 'recipe-item-1-uuid'},
                  {recipe_id: '2222222', recipe_uuid: 'recipe-item-2-uuid'}
                ],
                delivery_date: term({
                  matcher: dateTimeRegexPattern,
                  generate: '2021-11-18 00:00:00',
                }),
                delivery_slot: {
                  delivery_start: term({
                    matcher: timeRegexPattern,
                    generate: '08:00:00',
                  }),
                  delivery_end: term({
                    matcher: timeRegexPattern,
                    generate: '18:59:59',
                  }),
                }
              }
            }
          }
        })
    )

    const order = await getOrder(123456789)

    expect(order).toEqual({
      id: '123456789',
      recipeItems: [
        {recipeId: '1111111', recipeUuid: 'recipe-item-1-uuid'},
        {recipeId: '2222222', recipeUuid: 'recipe-item-2-uuid'}
      ],
      deliveryDate: '2021-11-18 00:00:00',
      deliverySlot: {
        deliveryStart: '08:00:00',
        deliveryEnd: '18:59:59',
      }
    })
  })

  test('should throw exception when attempting to retrieve a non-existent order', async () => {
    await pact.addInteraction(
      givenInitialState({
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for a non-existent order')
        .withRequest({
          method: 'GET',
          path: '/order/non-existent-order-id',
          headers: {
            Authorization: 'Bearer the-session-access-token',
          }
        })
        .willRespondWith({
          status: 404
        })
    )

    await expect(getOrder('non-existent-order-id')).rejects.toBeDefined()
  })

  test('should throw exception when attempting to retrieve an order using an invalid access token', async () => {
    accessToken = 'an-invalid-session-access-token'

    await pact.addInteraction(
      givenInitialState({
        orders: [{id: 123456789}],
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for an order using an invalid access token')
        .withRequest({
          method: 'GET',
          path: '/order/123456789',
          headers: {
            Authorization: 'Bearer an-invalid-session-access-token',
          }
        })
        .willRespondWith({
          status: 401
        })
    )

    await expect(getOrder(123456789)).rejects.toBeDefined()
  })

  test('should throw exception when attempting to retrieve an order without providing an access token', async () => {
    await pact.addInteraction(
      givenInitialState({
        orders: [{id: 123456789}],
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for an order without providing an access token')
        .withRequest({
          method: 'GET',
          path: '/order/123456789',
        })
        .willRespondWith({
          status: 401
        })
    )

    await expect(getOrder(123456789)).rejects.toBeDefined()
  })
})
