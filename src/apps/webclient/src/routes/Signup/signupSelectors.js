import { createSelector } from 'reselect'
import { getPromoCode } from 'selectors/basket'

export const getIsWizardWithoutImagesEnabled = ({ features }) =>
  features && features.getIn(['isWizardWithoutImagesEnabled', 'value'], false)

export const getPromoStore = ({ promoStore }) => promoStore

export const getCurrentPromoCodeData = createSelector(
  [getPromoCode, getPromoStore],
  (promoCode, promoStore) => {
    if (!promoCode) {
      return null
    }

    return promoStore.getIn([promoCode, 'codeData'], null)
  },
)

export const getCurrentPromoCodeCustomText1 = createSelector(
  [getCurrentPromoCodeData],
  (promoCodeData) => {
    if (!promoCodeData) {
      return null
    }

    return promoCodeData.getIn(['campaign', 'landingDetails1'], null)
  },
)

export const getCurrentPromoCodeCustomText2 = createSelector(
  [getCurrentPromoCodeData],
  (promoCodeData) => {
    if (!promoCodeData) {
      return null
    }

    return promoCodeData.getIn(['campaign', 'landingDetails2'], null)
  },
)

export const getIsSkipWizardEnabled = ({ features }) =>
  features && features.getIn(['isSkipWizardEnabled', 'value'], false)

export const getPendingSlice = (state) => state.pending

export const createSelectIsPendingByActionType = (actionType) =>
  createSelector(getPendingSlice, (pendingSlice) => pendingSlice.get(actionType))

export const getNumberOfPeople = (state) => state.signup.getIn(['numberOfPeople'])
