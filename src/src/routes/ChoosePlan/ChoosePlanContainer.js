import { connect } from 'react-redux'
import { choosePlanContinue, stashTempPromoCode, clearTempPromoCode, trackSubscriptionOptionSelected } from 'actions/choosePlan'
import { areExtrasIncluded, getSubscriptionOptionPrices, getRecipeTotal } from 'selectors/pricing'
import { getNumPortions, getBasketTotalRecipes, getPromoCode } from 'selectors/basket'
import { getTempPromoCode } from 'selectors/temp'
import { ChoosePlan } from './ChoosePlan'
import { calculateTransactionalOptionPrices} from './helper.js'

const mapStateToProps = state => {
  const numPortions = getNumPortions(state)
  const numRecipes = getBasketTotalRecipes(state)
  const recipeTotal = getRecipeTotal(state)
  const transactionalPrices = calculateTransactionalOptionPrices(recipeTotal, numPortions, numRecipes)
  const subscriptionPrices = getSubscriptionOptionPrices(state)
  const extrasIncluded = areExtrasIncluded(state)
  const promoCode = getPromoCode(state)
  const tempPromoCode = getTempPromoCode(state)

  return {
    subscriptionPrices,
    transactionalPrices,
    extrasIncluded,
    promoCode,
    tempPromoCode
  }
}

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue,
  stashTempPromoCode,
  clearTempPromoCode,
  trackSubscriptionOptionSelected
})(ChoosePlan)

export { ChoosePlanContainer }
