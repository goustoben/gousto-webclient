import actionTypes from 'actions/actionTypes'

export const trackWelcomeAppPromoClick = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData:{
        actionType: 'AppPromoSection Clicked'
      }
    })
  }
)
