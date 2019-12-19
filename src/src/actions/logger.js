import actionTypes from './actionTypes'

export const loggerSetUuid = (uuid) => ({
  type: actionTypes.LOGGER_SET_UUID,
  uuid,
})
