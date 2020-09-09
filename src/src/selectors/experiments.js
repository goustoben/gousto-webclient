import { createSelector } from 'reselect'
import { actionTypes } from 'actions/actionTypes'

export const isFetchingExperiments = state => state.pending.get(actionTypes.EXPERIMENTS_FETCHING, false)
export const hasFetchedExperiments = state => state.experiments.get('fetchedExperiments')

export const shouldFetchExperiments = createSelector(
  [isFetchingExperiments, hasFetchedExperiments],
  (isFetching, hasFetched) => !isFetching && !hasFetched
)
