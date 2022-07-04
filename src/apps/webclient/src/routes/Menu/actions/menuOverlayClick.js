import { basketRestorePreviousValues } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'

export const menuOverlayClick = (removeRecipeFromBasket) => (dispatch, getState) => {
  const { boxSummaryShow, menuBrowseCTAShow } = getState()

  if (boxSummaryShow.get('show')) {
    dispatch(boxSummaryVisibilityChange(false, removeRecipeFromBasket))
    dispatch(basketRestorePreviousValues())

    return
  }

  if (menuBrowseCTAShow) {
    dispatch(menuBrowseCTAVisibilityChange(false))
  }
}
