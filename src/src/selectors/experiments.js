import { createSelector } from 'reselect'
import { actionTypes } from 'actions/actionTypes'

export const getExperiments = state => state.experiments.get('experiments')
export const isFetchingExperiments = state => state.pending.get(actionTypes.EXPERIMENTS_FETCHING, false)
export const hasFetchedExperiments = state => state.experiments.get('fetchedExperiments')
export const hasExperimentsFetchError = state => state.experiments.get('hasFetchError')

export const shouldFetchExperiments = createSelector(
  [isFetchingExperiments, hasFetchedExperiments, hasExperimentsFetchError],
  (isFetching, hasFetched, hasFetchError) => !isFetching && !hasFetched && !hasFetchError
)

// Curried function to keep memoization when using different "experimentName" prop.
export const makeGetExperimentByName = () => createSelector(
  [getExperiments, (_, props) => props.experimentName],
  (experiments, experimentName) => experiments.get(experimentName, null)
)

export const shouldAssignUserToExperiment = createSelector(
  [makeGetExperimentByName(), isFetchingExperiments],
  (experiment, isFetching) => !experiment && !isFetching
)
