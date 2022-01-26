import { connect } from 'react-redux'
import { getUserFirstName } from 'selectors/user'
import {
  trackConfirmationCTA,
  trackRefundFAQClick,
  trackIngredientsGetInTouchClick
} from '../actions/getHelp'
import { getSelectedIngredientIssuesIDs } from '../selectors/selectors'
import { getCompensation, getIsMultiComplaints } from '../selectors/compensationSelectors'
import { AutoAcceptConfirmation } from './AutoAcceptConfirmation'

const AutoAcceptConfirmationContainer = connect((state) => ({
  creditAmount: getCompensation(state).amount,
  issuesIDs: getSelectedIngredientIssuesIDs(state) || [],
  nameFirst: getUserFirstName(state) || '',
  totalCreditAmount: getCompensation(state).totalAmount,
  isMultiComplaints: getIsMultiComplaints(state)
}), {
  trackConfirmationCTA,
  trackIngredientsGetInTouchClick,
  trackRefundFAQClick,
})(AutoAcceptConfirmation)

export {
  AutoAcceptConfirmationContainer
}
