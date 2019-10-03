export const getSurchargeTotal = ({ pricing }) => pricing.getIn(['prices','surchargeTotal'])

export const getDeliveryTotal = ({ pricing }) => pricing.getIn(['prices','deliveryTotal'])

export const getGrossTotal = ({ pricing }) => pricing.getIn(['prices','grossTotal'])

export const getRecipeTotal = ({ pricing }) => pricing.getIn(['prices','recipeTotal'])

export const getRecipeTotalDiscounted = ({ pricing }) => pricing.getIn(['prices','recipeTotalDiscounted'])

export const getPricePerPortion = ({ pricing }) => pricing.getIn(['prices','pricePerPortion'])

export const getPricePerPortionDiscounted = ({ pricing }) => pricing.getIn(['prices','pricePerPortionDiscounted'])

export const getLoading = ({ pricing }) => pricing.get('pending') || !getRecipeTotal({ pricing })

export const areExtrasIncluded = state => {
  const surchargeTotal = getSurchargeTotal(state)
  const deliveryTotal = getDeliveryTotal(state)
  const grossTotal = getGrossTotal(state)
  const recipeTotal = getRecipeTotal(state)

  const isSurcharge = surchargeTotal && surchargeTotal !== '0.00'
  const isDeliveryCost = deliveryTotal && deliveryTotal !== '0.00'
  const isOtherCost = grossTotal != recipeTotal

  return isSurcharge || isDeliveryCost || isOtherCost
}

export const getSubscriptionOptionPrices = state => {

  const recipeTotal = getRecipeTotal(state)
  const recipeTotalDiscounted = getRecipeTotalDiscounted(state)
  const pricePerPortionDiscounted = getPricePerPortionDiscounted(state)

  return {
    totalPrice:recipeTotal,
    totalPriceDiscounted: recipeTotalDiscounted,
    pricePerPortion: pricePerPortionDiscounted
  }
}
