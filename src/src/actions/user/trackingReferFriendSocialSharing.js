export const trackingReferFriendSocialSharing = (actionType, trackingType, channel) => dispatch => {
  if (actionType && trackingType) {
    dispatch({
      type: actionType,
      trackingData: {
        actionType: trackingType,
        channel
      }
    })
  }
}
