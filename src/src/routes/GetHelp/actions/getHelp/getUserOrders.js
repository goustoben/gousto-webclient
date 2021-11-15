import { pending } from "actions/status/pending"
import { actionTypes } from "routes/GetHelp/actions/actionTypes"
import { error } from "actions/status/error"
import { fetchUserOrders } from "apis/users/fetchUserOrders"
import logger from "utils/logger"

export const getUserOrders = (orderType = 'pending', number = 10) => (
    async (dispatch, getState) => {
        dispatch(pending(actionTypes.GET_HELP_LOAD_ORDERS, true))
        dispatch(error(actionTypes.GET_HELP_LOAD_ORDERS, null))

        try {
            const accessToken = getState().auth.get('accessToken')
            const {data: orders} = await fetchUserOrders(accessToken, {
                limit: number,
                sort_order: 'desc',
                state: orderType,
                includes: ['shipping_address']
            })

            dispatch({
                type: actionTypes.GET_HELP_LOAD_ORDERS,
                orders
            })
        } catch (err) {
            dispatch(error(actionTypes.GET_HELP_LOAD_ORDERS, err.message))
            logger.error(err)
        }
        dispatch(pending(actionTypes.GET_HELP_LOAD_ORDERS, false))
    }
)
