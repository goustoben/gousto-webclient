import { connect } from 'react-redux'
import { getUserFirstName } from 'selectors/user'
import { getSelectedIngredientIssuesIDs } from '../selectors/selectors'
import { getCompensation, getIsMultiComplaints } from '../selectors/compensationSelectors'
import { Confirmation } from './Confirmation'
import { trackConfirmationCTA } from "routes/GetHelp/actions/getHelp/trackConfirmationCTA"
import { trackRefundFAQClick } from "routes/GetHelp/actions/getHelp/trackRefundFAQClick"

const ConfirmationContainer = connect((state) => ({
  creditAmount: getCompensation(state).amount,
  isMultiComplaints: getIsMultiComplaints(state),
  issuesIDs: getSelectedIngredientIssuesIDs(state) || [],
  nameFirst: getUserFirstName(state) || '',
}), {
  trackConfirmationCTA,
  trackRefundFAQClick,
})(Confirmation)

export {
  ConfirmationContainer
}
