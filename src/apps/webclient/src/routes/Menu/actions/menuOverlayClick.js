import { basketRestorePreviousValues } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'

export const menuOverlayClick = () => (dispatch, getState) => {
  const { boxSummaryShow, menuBrowseCTAShow } = getState()

  if (boxSummaryShow.get('show')) {
    dispatch(boxSummaryVisibilityChange(false))
    dispatch(basketRestorePreviousValues())

    return
  }

  if (menuBrowseCTAShow) {
    dispatch(menuBrowseCTAVisibilityChange(false))
  }
}
