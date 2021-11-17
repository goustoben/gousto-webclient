import { set } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { actionTypes } from "actions/actionTypes"

export const appBannerDismiss = () => (
    dispatch => {
        if (__CLIENT__) {
            set(Cookies, 'app_banner_dismissed', true, 1)
        }

        dispatch({
            type: actionTypes.APP_BANNER_DISMISSED
        })
    }
)
