/**
 * @jest-environment ./src/adapters/__tests__/support/adapterTestEnvironment
 */

import { factory } from '../unsubscribeUserFromMarketing'
import { givenInitialState, givenNoInitialState, pactBetween } from './support/pactUtils'

describe('Unsubscribe user from marketing', () => {
  let pact
  let unsubscribeUserFromMarketing

  beforeAll(async () => {
    pact = await pactBetween('webclient', 'core')
  })

  beforeEach(() => {
    unsubscribeUserFromMarketing = factory(pact.mockService.baseUrl)
  })

  test('should unsubscribe user from marketing', async () => {
    await pact.addInteraction(
      givenInitialState({
        users: [{
          id: 'the-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })
        .uponReceiving('request to unsubscribe user from marketing')
        .withRequest({
          method: 'DELETE',
          path: '/user/the-user-id/marketing/the-marketing-type',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'marketing_unsubscribe_token=the-marketing-unsubscribe-token'
        })
        .willRespondWith({
          status: 200,
          body: {}
        })
    )

    await expect(unsubscribeUserFromMarketing('the-user-id', 'the-marketing-type', 'the-marketing-unsubscribe-token')).resolves.toBeDefined()
  })

  test('should throw exception when attempting to unsubscribe non-existent user', async () => {
    await pact.addInteraction(
      givenNoInitialState()
        .uponReceiving('request to unsubscribe non-existent user from marketing')
        .withRequest({
          method: 'DELETE',
          path: '/user/non-existent-user-id/marketing/the-marketing-type',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'marketing_unsubscribe_token=the-marketing-unsubscribe-token'
        })
        .willRespondWith({
          status: 404,
          body: {}
        }
        ))

    await expect(unsubscribeUserFromMarketing('non-existent-user-id', 'the-marketing-type', 'the-marketing-unsubscribe-token')).rejects.toBeDefined()
  })

  test('should throw exception when attempting to unsubscribe user using non-existent token', async () => {
    await pact.addInteraction(
      givenInitialState({
        users: [{
          id: 'the-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })
        .uponReceiving('request to unsubscribe user from marketing using non-existent token')
        .withRequest({
          method: 'DELETE',
          path: '/user/the-user-id/marketing/the-marketing-type',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'marketing_unsubscribe_token=non-existent-marketing-unsubscribe-token'
        })
        .willRespondWith({
          status: 404,
          body: {}
        })
    )

    await expect(unsubscribeUserFromMarketing('the-user-id', 'the-marketing-type', 'non-existent-marketing-unsubscribe-token')).rejects.toBeDefined()
  })

  afterEach(() => pact.verify())

  afterAll(() => pact.finalize())
})
