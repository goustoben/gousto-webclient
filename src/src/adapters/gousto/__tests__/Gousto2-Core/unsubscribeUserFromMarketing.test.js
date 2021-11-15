/**
 * @jest-environment ./jest/goustoServiceAdapterTestEnvironment
 */

import { term } from '@pact-foundation/pact/src/dsl/matchers'
import { givenInitialState, givenNoInitialState } from '../__support__/pactUtils'
import { createAdapter } from '../../Gousto2-Core/unsubscribeUserFromMarketing'

describe('Unsubscribe user from marketing', () => {
  let unsubscribeUserFromMarketing

  beforeEach(() => {
    unsubscribeUserFromMarketing = createAdapter(pact.mockService.baseUrl)
  })

  test('should unsubscribe user from marketing', async () => {
    await pact.addInteraction(
      givenInitialState({
        users: [{
          authUserId: 'the-auth-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })
        .uponReceiving('request to unsubscribe user from marketing')
        .withRequest({
          method: 'PUT',
          path: '/user/the-auth-user-id/marketing/unsubscribe_emails',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'marketing_unsubscribe_token=the-marketing-unsubscribe-token'
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': term({
              matcher: 'applicatio.',
              generate: 'application/json',
            })
          },
          body: {}
        })
    )

    await expect(unsubscribeUserFromMarketing('the-auth-user-id', 'unsubscribe_emails', 'the-marketing-unsubscribe-token')).resolves.toBeDefined()
  })

  test('should throw exception when attempting to unsubscribe non-existent user', async () => {
    await pact.addInteraction(
      givenNoInitialState()
        .uponReceiving('request to unsubscribe non-existent user from marketing')
        .withRequest({
          method: 'PUT',
          path: '/user/non-existent-user-id/marketing/unsubscribe_emails',
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

    await expect(unsubscribeUserFromMarketing('non-existent-user-id', 'unsubscribe_emails', 'the-marketing-unsubscribe-token')).rejects.toBeDefined()
  })

  test('should throw exception when attempting to unsubscribe user using non-existent token', async () => {
    await pact.addInteraction(
      givenInitialState({
        users: [{
          authUserId: 'the-auth-user-id',
          marketingUnsubscribeToken: 'the-marketing-unsubscribe-token'
        }]
      })
        .uponReceiving('request to unsubscribe user from marketing using non-existent token')
        .withRequest({
          method: 'PUT',
          path: '/user/the-auth-user-id/marketing/unsubscribe_emails',
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

    await expect(unsubscribeUserFromMarketing('the-auth-user-id', 'unsubscribe_emails', 'non-existent-marketing-unsubscribe-token')).rejects.toBeDefined()
  })
})
