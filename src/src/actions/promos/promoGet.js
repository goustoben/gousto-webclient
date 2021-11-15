import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { productsLoadProductsById } from "actions/products/productsLoadProductsById"
import { promoReceive } from "./promoReceive"
import { userLoadData } from "actions/user/userLoadData"
import { userPromoApplyCode } from "actions/user/userPromoApplyCode"
import { fetchPromo } from "apis/promos/fetchPromo"

export const promoGet = code => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.PROMO_GET, true))
    dispatch(error(actionTypes.PROMO_GET, null))
    const accessToken = getState().auth.get('accessToken')
    let promo
    let errored

    try {
      const {data} = await fetchPromo(accessToken, code)
      promo = data
    } catch (e) {
      errored = true
      dispatch(error(actionTypes.PROMO_GET, e.message))
    }

    try {
      if (Boolean(promo.codeData.campaign.enabled) === false) {
        dispatch(error(actionTypes.PROMO_GET, 'not-exist'))
        errored = true
      }
    } catch (e) {
      errored = true
    }

    if (promo) {
      promo.hasAgeRestricted = false
      promo.justApplied = false
    }
    const isAuthenticated = getState().auth.get('isAuthenticated')

    if (promo && promo.addGiftOrderRules) {
      const productIds = promo.addGiftOrderRules
        .filter(rule => rule.type === 'Product')
        .map(rule => rule.id)
      await dispatch(productsLoadProductsById(productIds))

      const state = getState()
      const ageRestricted = productIds
        .map(id => state.products.get(id))
        .filter(product => product.get('ageRestricted'))

      const needsUserData = ageRestricted
        .length > 0 && !state.user.get('id', false) && isAuthenticated

      promo.hasAgeRestricted = Boolean(ageRestricted.length)

      if (needsUserData) {
        await dispatch(userLoadData())
      }
    }

    if (isAuthenticated) {
      if (promo.hasAgeRestricted) {
        if (getState().user.get('ageVerified', false)) {
          try {
            await dispatch(userPromoApplyCode(code))
            promo.justApplied = true
          } catch (error) {
            throw new Error('Promo cannot be applied')
          }
        }
      } else {
        try {
          await dispatch(userPromoApplyCode(code))
          promo.justApplied = true
        } catch (error) {
          throw new Error('Promo cannot be applied')
        }
      }
    }

    dispatch(pending(actionTypes.PROMO_GET, false))
    if (!errored) {
      dispatch(promoReceive(promo))
    }
  }
)
