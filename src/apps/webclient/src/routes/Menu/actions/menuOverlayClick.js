import { basketRestorePreviousValues } from 'actions/basket'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'

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
