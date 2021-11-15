import { connect } from 'react-redux'

import { getUserId } from '../../../selectors/user'
import { getAccessToken } from '../../../selectors/auth'
import {
  getIsError,
  getPending,
  getSelectedIngredients,
} from '../selectors/selectors'
import { getCompensation, getIsMultiComplaints } from '../selectors/compensationSelectors'
import { actionTypes } from '../actions/actionTypes'

import { Refund } from './Refund'
import { createComplaint } from "routes/GetHelp/actions/createComplaint/createComplaint"
import { trackIngredientsGetInTouchClick } from "routes/GetHelp/actions/getHelp/trackIngredientsGetInTouchClick"

const mapStateToProps = (state) => ({
  compensation: getCompensation(state),
  user: {
    id: getUserId(state),
    accessToken: getAccessToken(state),
  },
  isAnyPending: getPending(state, actionTypes.GET_HELP_CREATE_COMPLAINT),
  isAnyError: getIsError(state, actionTypes.GET_HELP_CREATE_COMPLAINT),
  isMultiComplaints: getIsMultiComplaints(state),
  numberOfIngredients: Object.keys(getSelectedIngredients(state)).length,
})

const RefundContainer = connect(mapStateToProps, {
  createComplaint,
  trackIngredientsGetInTouchClick,
})(Refund)

export {
  RefundContainer
}
