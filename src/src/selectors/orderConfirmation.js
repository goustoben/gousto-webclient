import { createSelector } from 'reselect'

export const isOrderDetailsLoading = state => {
  const orderDetailsActions = ['PRODUCT_CATEGORIES_RECEIVE', 'PRODUCTS_STOCK_CHANGE', 'PRODUCTS_RECEIVE', 'USER_LOAD_ORDERS']

  return state.pending.some((value, key) => {
    return value && orderDetailsActions.includes(key)
  })
}

export const isReferralOfferLoading = state => !!state.pending.get('USER_LOAD_REFERRAL_OFFER')

export const isOrderConfirmationPageLoading = createSelector(
  [isOrderDetailsLoading, isReferralOfferLoading],
  (orderDetailsLoading, referralOfferLoading) => orderDetailsLoading || referralOfferLoading
)
