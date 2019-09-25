import { createSelector } from 'reselect'

export const locationBeforeTransitions = (state) => state.routing && state.routing.locationBeforeTransitions
export const locationQuery = (state) => locationBeforeTransitions(state) ? locationBeforeTransitions(state).query : ''

export const locationAtMyGousto = createSelector(
  locationBeforeTransitions,
  locationQuery,
  (beforeTransitions, query) => {
    if (beforeTransitions && beforeTransitions.pathname === '/my-gousto') {
      return true
    }

    if (query && query.path === 'my-gousto') {
      return true
    }

    return false
  }
)
