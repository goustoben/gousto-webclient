import { useContext, useEffect } from 'react'
import { buildSubscriptionCommandUrl } from 'routes/Account/apis/subscription'

import endpoint from 'config/endpoint'
import routes from 'config/routes'
import logger from 'utils/logger'
import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'
import { useFetch } from '../../../../hooks/useFetch'
import { SubscriptionContext } from '../context'

import { actionTypes } from '../context/reducers'

import {
  getSubscriptionUpdatePayload,
  getSubscriptionUpdateV2Payload,
} from '../context/selectors/subscription'
import { getDeliverySlots } from '../context/selectors/deliveries'
import { getCurrentUserId } from '../context/selectors/currentUser'

import { trackSubscriptionSettingsChange } from '../tracking/subscriptionSettings'
import {
  mapSubscriptionUpdateV2Payload,
  mapSubscriptionUpdateV2RequestPayload,
} from '../utils/mapping'

const validateUpdateSubscriptionPayload = (payload) => {
  const payloadKeys = Object.keys(payload)
  const requiredKeys = ['num_portions', 'num_recipes', 'box_type', 'delivery_slot_id', 'interval']

  return (
    requiredKeys.every((requiredKey) => payloadKeys.includes(requiredKey))
    && requiredKeys.length === payloadKeys.length
  )
}

export const useUpdateSubscription = ({ accessToken, data, trigger, settingName }) => {
  const context = useContext(SubscriptionContext)
  const { state, dispatch } = context
  const slots = getDeliverySlots(state)

  const restPayload = getSubscriptionUpdatePayload(state)
  const body = {
    ...getSubscriptionUpdateV2Payload(state),
    ...mapSubscriptionUpdateV2RequestPayload(parseObjectKeysToCamelCase(data), slots),
  }
  const payload = {
    ...restPayload,
    ...data,
  }
  const isValidPayload = validateUpdateSubscriptionPayload(payload)

  if (!isValidPayload) {
    logger.warning(`Update subscription payload not valid: ${JSON.stringify(payload)}`)
  }

  const { isNewSubscriptionApiEnabled } = state

  const url = isNewSubscriptionApiEnabled
    ? buildSubscriptionCommandUrl(getCurrentUserId(state))
    : `${endpoint('core')}${routes.core.currentSubscription}`

  const [isLoading, response, error] = useFetch({
    url,
    trigger,
    needsAuthorization: true,
    accessToken,
    options: {
      method: 'PUT',
      ...(isNewSubscriptionApiEnabled && { body: JSON.stringify(body) }),
    },
    ...(!isNewSubscriptionApiEnabled && { parameters: payload }),
  })

  useEffect(() => {
    if (!isLoading && response && !error) {
      let subscription
      if (isNewSubscriptionApiEnabled) {
        subscription = mapSubscriptionUpdateV2Payload(response.data.subscription, slots)
      } else {
        subscription = response.result.data
      }
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
  }, [dispatch, response, error, isLoading, isNewSubscriptionApiEnabled, settingName, slots])

  return [isLoading, response, error]
}
