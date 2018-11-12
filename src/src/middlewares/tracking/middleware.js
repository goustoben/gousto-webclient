export default (tracker, version) => ({ getState }) => (
  next => action => {
    // V2 tracker
    if (version === 'v2') {
      const prevState = getState()
      next(action)
      tracker(action, getState(), prevState)
    } else {
      // V1 tracker
      if (action.trackingData) {
        let pathname

        try {
          pathname = getState().routing.locationBeforeTransitions.pathname
        } catch (e) {
          if (__CLIENT__ && window) {
            pathname = window.location.pathname
          }
        }
        tracker(action.trackingData, { pathname })
      }

      next(action)
    }
  }
)
