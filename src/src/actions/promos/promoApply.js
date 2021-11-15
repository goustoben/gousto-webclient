import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { basketPromoCodeChange } from "actions/basket/basketPromoCodeChange"
import { menuLoadBoxPrices } from "actions/menu/menuLoadBoxPrices"
import { promoCloseModal } from "./promoCloseModal"
import { userPromoApplyCode } from "actions/user/userPromoApplyCode"
import { legacyVerifyAge } from "apis/legacy/legacyVerifyAge"

export const promoApply = () => (
  async (dispatch, getState) => {
    const state = getState()

    if (!state.pending.get(actionTypes.PROMO_APPLY, false)) {
      dispatch(pending(actionTypes.PROMO_APPLY, true))

      const code = state.promoCurrent
      const hasAgeRestricted = state.promoStore.getIn([code, 'hasAgeRestricted'], false)
      const isAuthenticated = state.auth.get('isAuthenticated')

      try {
        if (isAuthenticated) {
          await dispatch(userPromoApplyCode(code))
        } else {
          dispatch(basketPromoCodeChange(code))

          if (hasAgeRestricted) {
            await legacyVerifyAge()
          }
        }

        await dispatch(menuLoadBoxPrices())
      } catch (e) {
        dispatch(error(actionTypes.PROMO_APPLY, e.message))
        throw e
      } finally {
        dispatch(pending(actionTypes.PROMO_APPLY, false))
      }

      dispatch(promoCloseModal())
    }
  }
)
