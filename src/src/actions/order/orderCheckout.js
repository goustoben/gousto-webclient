import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { redirect } from "utils/window"
import { checkoutOrder } from "apis/orders/checkoutOrder"

export const orderCheckout = ({
                                addressId,
                                postcode,
                                numPortions,
                                promoCode,
                                orderId,
                                deliveryDayId,
                                slotId,
                                orderAction,
                                disallowRedirectToSummary,
                                recipes
                              }) => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.ORDER_CHECKOUT, true))
    dispatch(error(actionTypes.ORDER_CHECKOUT, null))
    const accessToken = getState().auth.get('accessToken')

    try {
      const {data} = await checkoutOrder(accessToken,
        {
          address_id: addressId,
          deliverypostcode: postcode,
          num_portions: numPortions,
          promocode: promoCode,
          order_id: orderId,
          delivery_day_id: deliveryDayId,
          delivery_slot_id: slotId,
          order_action: orderAction,
          disallow_redirect_to_summary: disallowRedirectToSummary,
          recipes,
        }
      )

      if (data.orderId && data.url) {
        return {
          orderId: data.orderId,
          url: data.url,
        }
      } else {
        throw {message: 'Error when saving the order'}
      }
    } catch (err) {
      if (err && err.redirected && err.url) {
        return redirect(err.url)
      }

      dispatch(error(actionTypes.ORDER_CHECKOUT, err.message))
    } finally {
      dispatch(pending(actionTypes.ORDER_CHECKOUT, false))
    }
  }
)
