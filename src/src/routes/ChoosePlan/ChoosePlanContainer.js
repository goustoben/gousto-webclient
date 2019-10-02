import { connect } from 'react-redux'
import { choosePlanContinue } from 'actions/choosePlan'
import pricingActions from 'actions/pricing'
import { getRecipeTotal, getLoading } from 'selectors/pricing'
import { ChoosePlan } from './ChoosePlan'

const mapStateToProps = state => {

const mapStateToProps = () => {
  const surchargeTotal = '5.99'
  const deliveryTotal = '2.99'
  const grossTotal = '40.73'
  const recipeTotal = '31.75'
  const recipeTotal = getRecipeTotal(state)

  return {
    isLoading: getLoading(state) || !recipeTotal,
    extrasIncluded: surchargeTotal || deliveryTotal || grossTotal !== recipeTotal,
  }
}

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue,
  pricingRequest: pricingActions.pricingRequest
})(ChoosePlan)

export { ChoosePlanContainer }
