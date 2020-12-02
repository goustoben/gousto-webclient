import { useEffect } from 'react'

import { trackSubscriptionSettingsChange } from '../tracking/subscriptionSettings'

export const useTrackSubscriptionUpdate = ({
  settingName,
  settingValue,
  isUpdateSuccess,
  isUpdateError
}) => {
  useEffect(() => {
    switch (true) {
    case isUpdateSuccess:
      trackSubscriptionSettingsChange({ settingName, action: 'update_success' })()
      break
    case isUpdateError:
      trackSubscriptionSettingsChange({ settingName, action: 'update_error' })()
      break
    default:
    }
  }, [
    settingName,
    settingValue,
    isUpdateSuccess,
    isUpdateError
  ])
}
