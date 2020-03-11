import * as trackingKeys from 'actions/trackingKeys'

export const menuLoadComplete = ({timeToLoadMs, useMenuService}) => ({
  type: trackingKeys.completeMenuLoad,
  data: ({ timeToLoadMs, useMenuService })
})
