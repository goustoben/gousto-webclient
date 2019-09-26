export const menuLoadComplete = (action) => {
  // eslint-disable-next-line no-console
  console.log('action!', action)

  return {
    type: action.type,
    data: {
      timeToLoadMs: action.timeToLoadMs
    }
  }
}
