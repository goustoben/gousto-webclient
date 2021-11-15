import { fetchOrder } from "apis/orders/fetchOrder"
import { asyncAndDispatch } from "routes/GetHelp/actions/utils"
import { actionTypes as webClientActionTypes } from "actions/actionTypes"

export const loadOrderById = ({accessToken, orderId}) => async (dispatch) => {
    const getPayload = async () => {
        const {data: order} = await fetchOrder(
            accessToken,
            orderId
        )

        return {order}
    }

    const handleError = (err) => {
        throw err
    }

    await asyncAndDispatch({
        dispatch,
        actionType: webClientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID,
        getPayload,
        errorMessage: `Failed to loadOrderById for orderId: ${orderId}`,
        handleError,
    })
}
