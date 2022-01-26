import Immutable from 'immutable'
import { requestNewsletterSignup } from 'apis/newsletter'
import { newsletterActions } from '../newsletter'

jest.mock('apis/newsletter', () => ({
  requestNewsletterSignup: jest.fn(),
}))

describe('newsletterActions', () => {
  describe('given newsletterSignup is called', () => {
    const dispatch = jest.fn()
    const getState = () => ({
      auth: Immutable.fromJS({
        accessToken: 'auth-access-token',
      }),
    })
    const email = 'test-email'

    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe('when the api request succeeds', () => {
      test('then it should dispatch correct actions', async () => {
        requestNewsletterSignup.mockImplementation(() => 'success')

        await newsletterActions.newsletterSignup(email)(dispatch, getState)

        expect(dispatch.mock.calls[0]).toMatchObject([{ type: 'NEWSLETTER_SIGNUP_PENDING' }])
        expect(dispatch.mock.calls[1]).toMatchObject([{ type: 'NEWSLETTER_SIGNUP_SUCCESS' }])
      })
    })

    describe('when the api request fails', () => {
      test('then it should dispatch correct actions', async () => {
        requestNewsletterSignup.mockImplementation(() => Promise.reject(new Error('test error')))

        await newsletterActions.newsletterSignup(email)(dispatch, getState)

        expect(dispatch.mock.calls[0]).toMatchObject([{ type: 'NEWSLETTER_SIGNUP_PENDING' }])
        expect(dispatch.mock.calls[1]).toMatchObject([{ type: 'NEWSLETTER_SIGNUP_ERROR' }])
      })
    })
  })
})
