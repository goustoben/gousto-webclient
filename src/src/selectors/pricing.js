import { createSelector } from 'reselect'

export const getDeliveryTotal = ({ pricing }) => pricing.getIn(['prices','deliveryTotal'])

export const getGrossTotal = ({ pricing }) => pricing.getIn(['prices','grossTotal'])

export const getRecipeTotal = ({ pricing }) => pricing.getIn(['prices','recipeTotal'])

export const getRecipeTotalDiscounted = ({ pricing }) => pricing.getIn(['prices','recipeTotalDiscounted'])

export const getPricePerPortion = ({ pricing }) => pricing.getIn(['prices','pricePerPortion'])

export const getPricePerPortionDiscounted = ({ pricing }) => pricing.getIn(['prices','pricePerPortionDiscounted'])

export const getLoading = ({ pricing }) => pricing.get('pending') || !getRecipeTotal({ pricing })

export const areExtrasIncluded = createSelector(
  [getSurchargeTotal, getDeliveryTotal, getGrossTotal, getRecipeTotal],
  (surchargeTotal, deliveryTotal, grossTotal, recipeTotal) => {
    const isSurcharge = surchargeTotal && surchargeTotal !== '0.00'
    const isDeliveryCost = deliveryTotal && deliveryTotal !== '0.00'
    const isOtherCost = grossTotal != recipeTotal

    return isSurcharge || isDeliveryCost || isOtherCost
  }
)

export const getSubscriptionOptionPrices = createSelector(
  [getRecipeTotal, getRecipeTotalDiscounted, getPricePerPortionDiscounted],
  (recipeTotal, recipeTotalDiscounted, pricePerPortionDiscounted) => ({
    totalPrice: recipeTotal,
    totalPriceDiscounted: recipeTotalDiscounted,
    pricePerPortion: pricePerPortionDiscounted
  })
)
