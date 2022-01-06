import * as trackingKeys from 'actions/trackingKeys'

export const menuLoadComplete = ({timeToLoadMs}) => ({
  type: trackingKeys.completeMenuLoad,
  data: ({ timeToLoadMs })
})
