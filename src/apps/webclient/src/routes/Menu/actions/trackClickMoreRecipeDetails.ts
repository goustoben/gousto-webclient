import { actionTypes } from 'actions/actionTypes'
import { clickMoreRecipeDetails } from 'actions/trackingKeys'

export const trackClickMoreRecipeDetails = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: clickMoreRecipeDetails,
  },
})
