import Immutable from "immutable"
import { accountFormName, deliveryFormName } from "selectors/checkout"
import { getPreviewOrderId, getPromoCode } from "selectors/basket"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { errorLoad } from "actions/status/errorLoad"
import { storeProspect } from "apis/prospect/storeProspect"

export function userProspect() {
  return async (dispatch, getState) => {
    const state = getState()
    const {routing} = state
    try {
      const step = routing.locationBeforeTransitions.pathname.split('/').pop()
      const account = Immutable.fromJS(state.form[accountFormName].values).get('account')
      const deliveryForm = Immutable.fromJS(state.form[deliveryFormName])
      const delivery = deliveryForm ? deliveryForm.getIn(['values', 'delivery']) : {}

      const reqData = {
        email: account.get('email'),
        user_name_first: deliveryForm ? delivery.get('firstName').trim() : '',
        user_name_last: deliveryForm ? delivery.get('lastName').trim() : '',
        promocode: getPromoCode(state),
        allow_marketing_email: account.get('allowEmail'),
        preview_order_id: getPreviewOrderId(state),
        step
      }
      dispatch(pending(actionTypes.USER_PROSPECT, true))
      dispatch(error(actionTypes.USER_PROSPECT, false))
      await storeProspect(reqData)
    } catch (err) {
      dispatch(errorLoad(actionTypes.USER_PROSPECT, err))
      throw err
    } finally {
      dispatch(pending(actionTypes.USER_PROSPECT, false))
    }

    return null
  }
}
