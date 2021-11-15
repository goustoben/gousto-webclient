import { getCompensation, getIsMultiComplaints } from "routes/GetHelp/selectors/compensationSelectors"
import { actionTypes } from "actions/actionTypes"

const trackAcceptIngredientsRefund = () => (dispatch, getState) => {
  const {amount} = getCompensation(getState())
  const isMultiComplaints = getIsMultiComplaints(getState())
  dispatch({
    type: actionTypes.GET_HELP_INGREDIENTS_ACCEPT_REFUND,
    amount,
    isMultiComplaints
  })
}
export { trackAcceptIngredientsRefund }
