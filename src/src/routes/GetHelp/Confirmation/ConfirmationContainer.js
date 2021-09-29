import { connect } from 'react-redux'
import { getUserFirstName } from 'selectors/user'
import { trackConfirmationCTA, trackRefundFAQClick } from '../actions/getHelp'
import { getSelectedIngredientIssuesIDs } from '../selectors/selectors'
import { getCompensation } from '../selectors/compensationSelectors'
import { Confirmation } from './Confirmation'

const ConfirmationContainer = connect((state) => ({
  creditAmount: getCompensation(state).amount,
  issuesIDs: getSelectedIngredientIssuesIDs(state) || [],
  nameFirst: getUserFirstName(state) || '',
}), {
  trackConfirmationCTA,
  trackRefundFAQClick,
})(Confirmation)

export {
  ConfirmationContainer
}
