import { createSelector } from 'reselect'

export const getCompensation = (state) => state.getHelp.get('compensation').toJS()

export const getIsMultiComplaints = createSelector(
  getCompensation,
  (compensation) => Boolean(compensation.totalAmount)
)
