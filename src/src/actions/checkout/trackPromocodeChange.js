export function trackPromocodeChange(promocode, added) {
  return (dispatch) => dispatch({
    type: 'TRACKING_PROMOCODE_CHANGE',
    trackingData: {
      actionType: added ? 'Promocode Applied' : 'Promocode Removed',
      promocode
    }
  })
}
