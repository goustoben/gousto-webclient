/**
 * @jest-environment ./jest/goustoServiceAdapterTestEnvironment
 */

import { term } from '@pact-foundation/pact/src/dsl/matchers'
import { givenInitialState } from '../__support__/pactUtils'
import { createAdapter } from '../../Gousto2-Core/getOrder'

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
        orders: [{
          id: 'the-order-id',
          recipeItems: [
            {recipeId: 'recipe-item-1-recipeId', recipeUuid: 'recipe-item-1-uuid'},
            {recipeId: 'recipe-item-2-recipeId', recipeUuid: 'recipe-item-2-uuid'}
          ],
          deliveryDate: '2021-11-18 10:49:21',
          deliverySlot: {
            deliveryStart: '08:00:00',
            deliveryEnd: '18:59:59',
          }
        }],
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for an order')
        .withRequest({
          method: 'GET',
          path: '/order/the-order-id',
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
            id: 'the-order-id',
            recipe_items: [
              {recipe_id: 'recipe-item-1-recipeId', recipe_uuid: 'recipe-item-1-uuid'},
              {recipe_id: 'recipe-item-2-recipeId', recipe_uuid: 'recipe-item-2-uuid'}
            ],
            delivery_date: '2021-11-18 10:49:21',
            delivery_slot: {
              delivery_start: '08:00:00',
              delivery_end: '18:59:59',
            }
          }
        })
    )

    const order = await getOrder('the-order-id')

    expect(order).toEqual({
      id: 'the-order-id',
      recipeItems: [
        {recipeId: 'recipe-item-1-recipeId', recipeUuid: 'recipe-item-1-uuid'},
        {recipeId: 'recipe-item-2-recipeId', recipeUuid: 'recipe-item-2-uuid'}
      ],
      deliveryDate: '2021-11-18 10:49:21',
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
        orders: [{id: 'the-order-id'}],
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for an order using an invalid access token')
        .withRequest({
          method: 'GET',
          path: '/order/the-order-id',
          headers: {
            Authorization: 'Bearer an-invalid-session-access-token',
          }
        })
        .willRespondWith({
          status: 401
        })
    )

    await expect(getOrder('the-order-id')).rejects.toBeDefined()
  })

  test('should throw exception when attempting to retrieve an order without providing an access token', async () => {
    await pact.addInteraction(
      givenInitialState({
        orders: [{id: 'the-order-id'}],
        sessions: [{accessToken: 'the-session-access-token'}]
      })
        .uponReceiving('request for an order without providing an access token')
        .withRequest({
          method: 'GET',
          path: '/order/the-order-id',
        })
        .willRespondWith({
          status: 401
        })
    )

    await expect(getOrder('the-order-id')).rejects.toBeDefined()
  })
})
