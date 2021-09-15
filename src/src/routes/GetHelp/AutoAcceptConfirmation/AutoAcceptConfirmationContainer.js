import { connect } from 'react-redux'
import { getUserFirstName } from 'selectors/user'
import {
  trackConfirmationCTA,
  trackRefundFAQClick,
  trackIngredientsGetInTouchClick
} from '../actions/getHelp'
import { getCompensation, getSelectedIngredientIssuesIDs } from '../selectors/selectors'
import { AutoAcceptConfirmation } from './AutoAcceptConfirmation'

const AutoAcceptConfirmationContainer = connect((state) => ({
  creditAmount: getCompensation(state).amount,
  issuesIDs: getSelectedIngredientIssuesIDs(state) || [],
  nameFirst: getUserFirstName(state) || '',
  totalCreditAmount: getCompensation(state).totalAmount,
}), {
  trackConfirmationCTA,
  trackIngredientsGetInTouchClick,
  trackRefundFAQClick,
})(AutoAcceptConfirmation)

export {
  AutoAcceptConfirmationContainer
}
