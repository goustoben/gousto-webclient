// click_more_recipe_details
import { Dispatch } from 'redux'

import { actionTypes } from 'actions/actionTypes'
import { clickMoreRecipeDetails } from 'actions/trackingKeys'

export const trackClickMoreRecipeDetails = () => (dispatch: Dispatch) =>
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: clickMoreRecipeDetails,
    },
  })
