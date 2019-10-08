import { connect } from 'react-redux'
import { choosePlanContinue } from 'actions/choosePlan'
import { areExtrasIncluded, getSubscriptionOptionPrices, getRecipeTotal } from 'selectors/pricing'
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

  return {
    subscriptionPrices,
    transactionalPrices,
    extrasIncluded
  }
}

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue
})(ChoosePlan)

export { ChoosePlanContainer }
