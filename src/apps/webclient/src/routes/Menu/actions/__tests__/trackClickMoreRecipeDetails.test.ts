import { actionTypes } from 'actions/actionTypes'
import { clickMoreRecipeDetails } from 'actions/trackingKeys'
import { trackClickMoreRecipeDetails } from 'routes/Menu/actions/trackClickMoreRecipeDetails'

describe('Given: trackClickMoreRecipeDetails', () => {
  describe('When: function being called (user clicks on "More details ->" link on recipe card)', () => {
    test('It: should called dispatch single time with given args', () => {
      const result = trackClickMoreRecipeDetails()

      expect(result).toStrictEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: clickMoreRecipeDetails,
        },
      })
    })
  })
})
