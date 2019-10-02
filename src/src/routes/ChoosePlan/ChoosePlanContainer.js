import { connect } from 'react-redux'
import { choosePlanContinue } from 'actions/choosePlan'
import pricingActions from 'actions/pricing'
import { getLoading, areExtrasIncluded, getSubscriptionOptionsPrices } from 'selectors/pricing'
import { ChoosePlan } from './ChoosePlan'
import { subscription, transactional } from './config'

const mapStateToProps = state => {
  const isLoading = getLoading(state)
  const [subscriptionPrices, transactionalPrices] = getSubscriptionOptionsPrices(state)

  const subscriptionOption = { ...subscription, ...subscriptionPrices}
  const transactionalOption = { ...transactional, ...transactionalPrices}
  const extrasIncluded = areExtrasIncluded(state)

  return {
    isLoading,
    subscriptionOption,
    transactionalOption,
    extrasIncluded
  }
}

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue,
  pricingRequest: pricingActions.pricingRequest
})(ChoosePlan)

export { ChoosePlanContainer }
