import { connect } from 'react-redux'
import { choosePlanContinue } from 'actions/choosePlan'
import { ChoosePlan } from './ChoosePlan'

const mapStateToProps = () => {
  const surchargeTotal = '5.99'
  const deliveryTotal = '2.99'
  const grossTotal = '40.73'
  const recipeTotal = '31.75'

  return {
    extrasIncluded: surchargeTotal || deliveryTotal || grossTotal !== recipeTotal,
  }
}

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue
})(ChoosePlan)

export { ChoosePlanContainer }
