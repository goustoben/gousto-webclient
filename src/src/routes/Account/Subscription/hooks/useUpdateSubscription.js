import { useContext, useEffect } from 'react'
import { buildSubscriptionCommandUrl } from 'routes/Account/apis/subscription'

import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'
import { useFetch } from '../../../../hooks/useFetch'
import { SubscriptionContext } from '../context'

import { actionTypes } from '../context/reducers'

import { getSubscriptionUpdatePayload } from '../context/selectors/subscription'
import { getDeliverySlots } from '../context/selectors/deliveries'
import { getCurrentUserId } from '../context/selectors/currentUser'

import { trackSubscriptionSettingsChange } from '../tracking/subscriptionSettings'
import {
  mapSubscriptionUpdatePayload,
  mapSubscriptionUpdateRequestPayload,
} from '../utils/mapping'

export const useUpdateSubscription = ({ accessToken, data, trigger, settingName }) => {
  const context = useContext(SubscriptionContext)
  const { state, dispatch } = context
  const slots = getDeliverySlots(state)

  const body = {
    ...getSubscriptionUpdatePayload(state),
    ...mapSubscriptionUpdateRequestPayload(parseObjectKeysToCamelCase(data), slots),
  }

  const url = buildSubscriptionCommandUrl(getCurrentUserId(state))

  const [isLoading, response, error] = useFetch({
    url,
    trigger,
    needsAuthorization: true,
    accessToken,
    options: {
      method: 'PUT',
      body: JSON.stringify(body),
    },
  })

  useEffect(() => {
    if (!isLoading && response && !error) {
      const subscription = mapSubscriptionUpdatePayload(response.data.subscription, slots)

      dispatch({
        type: actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED,
        data: {
          subscription,
        },
      })

      trackSubscriptionSettingsChange({ settingName, action: 'update_success' })()
    } else if (error) {
      trackSubscriptionSettingsChange({ settingName, action: 'update_error' })()
    }
  }, [dispatch, response, error, isLoading, settingName, slots])

  return [isLoading, response, error]
}
