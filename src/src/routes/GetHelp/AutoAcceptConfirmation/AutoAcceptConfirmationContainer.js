import { connect } from 'react-redux'
import { getUserFirstName } from 'selectors/user'
import { getSelectedIngredientIssuesIDs } from '../selectors/selectors'
import { getCompensation, getIsMultiComplaints } from '../selectors/compensationSelectors'
import { AutoAcceptConfirmation } from './AutoAcceptConfirmation'
import { trackIngredientsGetInTouchClick } from "routes/GetHelp/actions/getHelp/trackIngredientsGetInTouchClick"
import { trackConfirmationCTA } from "routes/GetHelp/actions/getHelp/trackConfirmationCTA"
import { trackRefundFAQClick } from "routes/GetHelp/actions/getHelp/trackRefundFAQClick"

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
