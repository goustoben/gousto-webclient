import { connect } from 'react-redux'
import { choosePlanContinue } from 'actions/choosePlan'
import pricingActions from 'actions/pricing'
import { getLoading, areExtrasIncluded, getSubscriptionOptionPrices, getRecipeTotal } from 'selectors/pricing'
import { getNumPortions, getBasketTotalRecipes } from 'selectors/basket'
import { ChoosePlan } from './ChoosePlan'
import { calculateTransactionalOptionPrices} from './helper.js'

const mapStateToProps = state => {
  const numPortions = getNumPortions(state)
  const numRecipes = getBasketTotalRecipes(state)
  const recipeTotal = getRecipeTotal(state)
  const transactionalPrices = calculateTransactionalOptionPrices(recipeTotal, numPortions, numRecipes)
  const subscriptionPrices = getSubscriptionOptionPrices(state)
  const extrasIncluded = areExtrasIncluded(state)
  const isLoading = getLoading(state)

  return {
    isLoading,
    subscriptionPrices,
    transactionalPrices,
    extrasIncluded
  }
}

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue,
  pricingRequest: pricingActions.pricingRequest
})(ChoosePlan)

export { ChoosePlanContainer }
