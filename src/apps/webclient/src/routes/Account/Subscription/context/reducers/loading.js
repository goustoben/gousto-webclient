export const reduceLoadingState = (state, entity) => ({
  ...state,
  [entity]: {
    ...state[entity],
    requestState: {
      isLoading: true,
      isLoaded: false
    }
  }
})
