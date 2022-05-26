import { userHasAvailableSlots } from 'routes/Menu/selectors/boxSummary'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsSignupReductionEnabled, getIsCommunicationPanelEnabled } from 'selectors/features'
import { getBoxSummaryDeliveryDays } from 'selectors/root'
import { getLoadingStateForOrder } from 'selectors/user'

export const shouldShowCapacityInfo = (state) =>
  !userHasAvailableSlots(state) &&
  getBoxSummaryDeliveryDays(state).size > 0 &&
  (!getLoadingStateForOrder(state) || !getIsAuthenticated(state))

export const isSignupReductionEnabled = (state) =>
  getIsSignupReductionEnabled(state) && !getIsAuthenticated(state)

export const shouldShowCommunicationPanel = (state) =>
  getIsCommunicationPanelEnabled(state) && !!getIsAuthenticated(state)
