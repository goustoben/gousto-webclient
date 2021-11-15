import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { basketRestorePreviousValues } from "actions/basket/basketRestorePreviousValues"
import { menuBrowseCTAVisibilityChange } from "actions/menu/menuBrowseCTAVisibilityChange"

export const menuOverlayClick = () => (
    (dispatch, getState) => {
        const {boxSummaryShow, menuBrowseCTAShow} = getState()

        if (boxSummaryShow.get('show')) {
            dispatch(boxSummaryVisibilityChange(false))
            dispatch(basketRestorePreviousValues())

            return
        }

        if (menuBrowseCTAShow) {
            dispatch(menuBrowseCTAVisibilityChange(false))
        }
    }
)
