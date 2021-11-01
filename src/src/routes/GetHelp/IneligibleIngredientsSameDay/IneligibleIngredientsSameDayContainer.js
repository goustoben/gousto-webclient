import { connect } from 'react-redux'
import {
  trackIngredientsGetInTouchClick,
  trackIngredientsGoToMyGousto,
  trackViewCreditClick,
} from '../actions/getHelp'
import { IneligibleIngredientsSameDay } from './IneligibleIngredientsSameDay'
import { getSsrTwoComplaintsSameDay } from '../../../selectors/features'

const mapStateToProps = (state) => ({
  ssrTwoComplaintsSameDay: getSsrTwoComplaintsSameDay(state),
})

const IneligibleIngredientsSameDayContainer = connect(mapStateToProps, {
  trackIngredientsGetInTouchClick,
  trackIngredientsGoToMyGousto,
  trackViewCreditClick,
})(IneligibleIngredientsSameDay)

export {
  IneligibleIngredientsSameDayContainer
}
