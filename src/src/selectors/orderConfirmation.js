export const isOrderConfirmationPageLoading = state => {
  const orderConfirmationActions = ['PRODUCT_CATEGORIES_RECEIVE', 'PRODUCTS_STOCK_CHANGE', 'PRODUCTS_RECEIVE', 'USER_LOAD_REFERRAL_OFFER', 'USER_LOAD_ORDERS']

  return state.pending.some((value, key) => {

    return value && orderConfirmationActions.includes(key)
  })
}
