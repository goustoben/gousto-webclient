import Immutable from 'immutable'

import { referAFriend } from 'apis/user'

import { userReferAFriend } from 'actions/user'

jest.mock('apis/user', () => ({
	referAFriend: jest.fn()
}))

describe('user actions', () => {
	const [dispatch, getState] = [jest.fn(), jest.fn()]

	describe('userReferAFriend action', () => {
		const email = 'test@test.com'

		afterEach(() => {
			referAFriend.mockClear()
		})

		describe('when an accessToken is not present in state', () => {
			beforeEach(() => {
				getState.mockReturnValue({
					auth: Immutable.Map({
						accessToken: ''
					})
				})
			})

			it('should not dispatch a referAFriend request', () => {
				userReferAFriend(email)(dispatch, getState)

				expect(referAFriend).not.toHaveBeenCalled()
			})
		})

		describe('when an accessToken is present in state', () => {
			beforeEach(() => {
				getState.mockReturnValue({
					auth: Immutable.Map({
						accessToken: 'user-access-token'
					})
				})
			})

			it('should dispatch a referAFriend request with the given email and accessToken', () => {
				userReferAFriend(email)(dispatch, getState)

				expect(referAFriend).toHaveBeenCalledWith('user-access-token', email)
			})
		})
	})
})
