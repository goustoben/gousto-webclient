import actionTypes from 'actions/actionTypes'

export const getAbandonBasketSessionState = () => dispatch => {
  const isFirstLoad = window.sessionStorage.getItem('isFirstLoadOfSession') !== 'false'

  dispatch({
    type: actionTypes.SET_FIRST_LOAD_OF_SESSION,
    value: isFirstLoad
  })
}

export const trackAbandonBasketEligibility = () => (dispatch, getState) => {
  const isFeatureFlagEnabled = getState().features.getIn(['abandonBasket', 'value'])

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: 'AbandonedBasket Available',
      featureFlagEnabled: isFeatureFlagEnabled
    }
  })
}

export const trackAbandonBasketContinueToMenu = () => (dispatch) => {
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: 'AbandonedBasket ContinueToMenu',
    }
  })
}
