import Immutable from 'immutable'
import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from 'actions/actionTypes'
import { userRecipeRatings, trackClickRateRecipes } from 'routes/Ratings/actions/feedback'
import { getUserFeedbackCount } from '../../apis/feedback'

jest.mock('../../apis/feedback', () => ({
  getUserFeedbackCount: jest.fn()
}))

describe('feedback actions', () => {
  describe('userRecipeRatings', () => {
    test('creates the correct action', async () => {
      const dispatchSpy = jest.fn()
      const getStateSpy = jest.fn().mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'access-token',
        }),
      })
      const expectedFeedbackCount = 3

      getUserFeedbackCount.mockResolvedValue({ data: { meta: { totalRecipeCount: expectedFeedbackCount }}})

      await userRecipeRatings()(dispatchSpy, getStateSpy)
      expect(getUserFeedbackCount).toHaveBeenCalledWith('access-token')
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.FEEDBACK_COUNT_RECEIVED,
        payload: expectedFeedbackCount
      })
    })
  })

  describe('trackClickRateRecipes', () => {
    test('creates the correct action', async () => {
      const dispatchSpy = jest.fn()
      const location = 'nav'
      const type = trackingKeys.clickRateRecipes

      trackClickRateRecipes('nav')(dispatchSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type,
        trackingData: {
          actionType: type,
          location
        }
      })
    })
  })
})

