import { createSelector } from 'reselect'

export const getSurchargeTotal = ({ pricing }) => pricing.getIn(['prices', 'surchargeTotal'])

export const getDeliveryTotal = ({ pricing }) => pricing.getIn(['prices', 'deliveryTotal'])

export const getGrossTotal = ({ pricing }) => pricing.getIn(['prices', 'grossTotal'])

export const getRecipeTotal = ({ pricing }) => pricing.getIn(['prices', 'recipeTotal'])

export const getRecipeTotalDiscounted = ({ pricing }) => pricing.getIn(['prices', 'recipeTotalDiscounted'])

export const getPricePerPortion = ({ pricing }) => pricing.getIn(['prices', 'pricePerPortion'])

export const getPricePerPortionDiscounted = ({ pricing }) => pricing.getIn(['prices', 'pricePerPortionDiscounted'])

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

export const arePricesLoaded = ({pricing}) => pricing.get('prices').size > 0

export const getTotalDiscount = ({ pricing }) => pricing.getIn(['prices', 'totalDiscount'])

export const getPricingPromoCode = ({ pricing }) => pricing.getIn(['prices', 'promoCode'])

export const getPricingTotalAmount = ({ pricing }) => pricing.getIn(['prices', 'total'])
