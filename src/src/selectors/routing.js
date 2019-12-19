export const locationBeforeTransitions = (state) => state.routing && state.routing.locationBeforeTransitions
export const locationQuery = (state) => locationBeforeTransitions(state) ? locationBeforeTransitions(state).query : ''
