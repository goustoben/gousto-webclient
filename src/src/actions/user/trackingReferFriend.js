export const trackingReferFriend = (actionType, trackingType) => dispatch => {
  if (actionType && trackingType) {
    dispatch({
      type: actionType,
      trackingData: {
        actionType: trackingType
      }
    })
  }
}
