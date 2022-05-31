import { actionTypes } from 'actions/actionTypes'
import { clickMoreRecipeDetails } from 'actions/trackingKeys'
import { trackClickMoreRecipeDetails } from 'routes/Menu/actions/trackClickMoreRecipeDetails'

const mockedDispatch = jest.fn()

describe('Given: trackClickMoreRecipeDetails', () => {
  describe('When: function being called (user clicks on "More details ->" link on recipe card)', () => {
    test('It: should called dispatch single time with given args', () => {
      const fnWithDispatch = trackClickMoreRecipeDetails()

      fnWithDispatch(mockedDispatch)

      expect(mockedDispatch).toBeCalledTimes(1)
      expect(mockedDispatch).toBeCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: clickMoreRecipeDetails,
        },
      })
    })
  })
})
