import { connect } from 'react-redux'
import { choosePlanContinue } from 'actions/choosePlan'
import { ChoosePlan } from './ChoosePlan'

const mapStateToProps = () => null

const ChoosePlanContainer = connect(mapStateToProps, {
  choosePlanContinue
})(ChoosePlan)

export { ChoosePlanContainer }
