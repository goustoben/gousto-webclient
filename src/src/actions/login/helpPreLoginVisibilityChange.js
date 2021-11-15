import { client } from "config/routes"
import { push } from "react-router-redux"
import { actionTypes } from "actions/actionTypes"

export const helpPreLoginVisibilityChange = visibility => (
  (dispatch) => {
    if (visibility === true) {
      const helpCentreUrl = `?target=${encodeURIComponent(`${__CLIENT_PROTOCOL__}://${__DOMAIN__}${client.helpCentre}`)}`
      dispatch(push({search: helpCentreUrl}))
    }
    dispatch({
      type: actionTypes.HELP_PRELOGIN_VISIBILITY_CHANGE,
      payload: {
        visibility,
      },
    })
  }
)
