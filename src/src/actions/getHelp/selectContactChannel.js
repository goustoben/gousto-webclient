import { actionTypes } from "actions/actionTypes"

const selectContactChannel = (channel) => ({
  type: actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT,
  channel,
})
export { selectContactChannel }
