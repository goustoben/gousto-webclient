import { actionTypes } from '../../../actions/actionTypes'
import * as trackingKeys from '../../../actions/trackingKeys'

export const viewAllFooterButtonClicked = () => ({
  type: actionTypes.MENU_CLICK_SHOW_ALL_RECIPES_FOOTER,
  trackingData: {
    actionType: trackingKeys.clickShowAllRecipesFooter,
  },
})
