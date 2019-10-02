export const getSurchargeTotal = ({ pricing }) => pricing.getIn(['prices','surchargeTotal'])

export const getDeliveryTotal = ({ pricing }) => pricing.getIn(['prices','deliveryTotal'])

export const getGrossTotal = ({ pricing }) => pricing.getIn(['prices','grossTotal'])

export const getRecipeTotal = ({ pricing }) => pricing.getIn(['prices','recipeTotal'])

export const getRecipeTotalDiscounted = ({ pricing }) => pricing.getIn(['prices','recipeTotalDiscounted'])

export const getPricePerPortion = ({ pricing }) => pricing.getIn(['prices','pricePerPortion'])

export const getPricePerPortionDiscounted = ({ pricing }) => pricing.getIn(['prices','pricePerPortionDiscounted'])

export const getPercentageOff = ({ pricing }) => pricing.getIn(['prices','percentageOff'])

export const getLoading = ({ pricing }) => pricing.get('pending') || !getRecipeTotal({ pricing })

export const areExtrasIncluded = state => {
  const surchargeTotal = getSurchargeTotal(state)
  const deliveryTotal = getDeliveryTotal(state)
  const grossTotal = getGrossTotal(state)
  const recipeTotal = getRecipeTotal(state)

  return Boolean(surchargeTotal || deliveryTotal || grossTotal !== recipeTotal)
}

export const getSubscriptionOptionsPrices = state => {

  const recipeTotal = getRecipeTotal(state)
  const recipeTotalDiscounted = getRecipeTotalDiscounted(state)
  const pricePerPortion = getPricePerPortion(state)
  const pricePerPortionDiscounted = getPricePerPortionDiscounted(state)
  const percentageOff = getPercentageOff(state)

  const subscriptionOption = {
    totalPrice:recipeTotal,
    totalPriceDiscounted: recipeTotalDiscounted,
    pricePerPortion: pricePerPortionDiscounted,
    percentageOff
  }

  const transactionalOption = {
    totalPrice:recipeTotal,
    pricePerPortion
  }

  return [subscriptionOption, transactionalOption]
}
