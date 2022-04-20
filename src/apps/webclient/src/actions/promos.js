import { fetchPromo, fetchPromocodeFromCampaignUrl } from 'apis/promos'
import { legacyVerifyAge } from 'apis/legacy'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { getIsAuthenticated } from 'selectors/auth'
import { actionTypes } from './actionTypes'
import statusActions from './status'
import userActions from './user'
import { productsLoadProductsById } from './products'
import { trackPromocodeChange } from './checkout'
import { trackUTMAndPromoCode } from './tracking'
import { signupSetGoustoOnDemandEnabled } from './signup'
import { clickCloseGodFailureHomepage, discountPopupDisplayed } from './trackingKeys'
import { menuLoadBoxPrices } from './menu'
import {
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
} from './basket'

const { pending, error } = statusActions

const promoReceive = promo => ({
  type: actionTypes.PROMO_RECEIVE,
  promo,
})

const promoStoreSaveError = (code, errorText) => ({
  type: actionTypes.PROMO_STORE_SAVE_ERROR,
  code,
  errorText
})

export const promoGet = code => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.PROMO_GET, true))
    dispatch(error(actionTypes.PROMO_GET, null))
    const accessToken = getState().auth.get('accessToken')
    let promo
    let errorText

    try {
      const { data } = await fetchPromo(accessToken, code)
      promo = data
    } catch (e) {
      errorText = e.message
      dispatch(error(actionTypes.PROMO_GET, errorText))
    }

    try {
      if (Boolean(promo.codeData.campaign.enabled) === false) {
        errorText = 'not-exist'
        dispatch(error(actionTypes.PROMO_GET, errorText))
      }
    } catch (e) {
      errorText = 'other-error'
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
        await dispatch(userActions.userLoadData())
      }
    }

    if (isAuthenticated) {
      if (promo.hasAgeRestricted) {
        if (getState().user.get('ageVerified', false)) {
          try {
            await dispatch(userActions.userPromoApplyCode(code))
            promo.justApplied = true
          } catch (error) {
            throw new Error('Promo cannot be applied')
          }
        }
      } else {
        try {
          await dispatch(userActions.userPromoApplyCode(code))
          promo.justApplied = true
        } catch (error) {
          throw new Error('Promo cannot be applied')
        }
      }
    }

    dispatch(pending(actionTypes.PROMO_GET, false))
    if (!errorText) {
      dispatch(promoReceive(promo))
    } else {
      dispatch(promoStoreSaveError(code, errorText))
    }
  }
)

const promoCurrentSet = code => ({
  type: actionTypes.PROMO_SET,
  code,
})

export const promoChange = code => (
  async (dispatch, getState) => {
    const state = getState()
    if (getIsGoustoOnDemandEnabled(state) && !getIsAuthenticated(state)) {
      dispatch(basketPromoCodeChange(code))
      await dispatch(menuLoadBoxPrices())
    }

    if (!state.promoStore.get(code, null)) {
      await dispatch(promoGet(code))
    }

    if (!state.error.get(actionTypes.PROMO_GET)) {
      dispatch(promoCurrentSet(code))
    }
  }
)

const promoGetFromLandingPage = landingUrl => (
  async (dispatch, getState) => {
    let promocode
    let errored

    try {
      const { data: code } = await fetchPromocodeFromCampaignUrl(null, landingUrl)
      promocode = code.promocode
    } catch (e) {
      errored = true
      dispatch(error(actionTypes.PROMO_GET, e.message))
    }

    if (!errored && promocode) {
      await promoChange(promocode.toUpperCase())(dispatch, getState)
    }
  }
)

const promoClear = () => ({
  type: actionTypes.PROMO_SET,
  code: '',
})

export const promoToggleModalVisibility = visible => dispatch => {
  if (visible) {
    dispatch(trackUTMAndPromoCode(discountPopupDisplayed))
  }

  dispatch({
    type: actionTypes.PROMO_MODAL_VISIBILITY_CHANGE,
    visible,
  })
}

const promoCloseModal = () => (
  dispatch => {
    dispatch(promoToggleModalVisibility(false))
    setTimeout(() => {
      dispatch(promoClear())
      dispatch(error(actionTypes.PROMO_APPLY, ''))
      dispatch(error(actionTypes.PROMO_GET, ''))
    }, 750)
  }
)

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
          await dispatch(userActions.userPromoApplyCode(code))
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

const promoApplyCheckoutCode = () => (
  async (dispatch) => {
    const promoCode = 'DTI-CHECKOUT30'

    try {
      dispatch(basketPromoCodeChange(promoCode))
      dispatch(basketPromoCodeAppliedChange(true))
      dispatch(trackPromocodeChange(promoCode, true))
    } catch (e) {
      throw new Error('Promo cannot be applied')
    }
  }
)

export const promoAgeVerify = ageVerified => ({
  type: actionTypes.PROMO_AGE_VERIFY,
  ageVerified,
})

export const promoResetGoustoOnDemandFlow = () => (
  dispatch => {
    dispatch(basketPromoCodeChange(''))
    dispatch(promoCurrentSet(''))
    dispatch(trackUTMAndPromoCode(clickCloseGodFailureHomepage))
    dispatch(signupSetGoustoOnDemandEnabled(false))
    dispatch(promoToggleModalVisibility(false))
  }
)

export const promoActions = {
  promoChange,
  promoApply,
  promoCloseModal,
  promoToggleModalVisibility,
  promoAgeVerify,
  promoGetFromLandingPage,
  promoGet,
  promoApplyCheckoutCode
}

// src/apps/webclient/legacy.js file uses the default export, and I'd rather not change
// it.

// eslint-disable-next-line import/no-default-export
export default promoActions
