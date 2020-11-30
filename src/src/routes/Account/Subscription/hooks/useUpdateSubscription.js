import { useContext, useEffect } from 'react'

import endpoint from 'config/endpoint'
import routes from 'config/routes'
import logger from 'utils/logger'
import { useFetch } from '../../../../hooks/useFetch'
import {
  SubscriptionContext,
} from '../context'

import {
  actionTypes
} from '../context/reducers'

import { getSubscriptionUpdatePayload } from '../context/selectors/subscription'

const validateUpdateSubscriptionPayload = (payload) => {
  const payloadKeys = Object.keys(payload)
  const requiredKeys = [
    'num_portions',
    'num_recipes',
    'box_type',
    'delivery_slot_id',
    'interval'
  ]

  return requiredKeys.every(requiredKey => payloadKeys.includes(requiredKey)) && requiredKeys.length === payloadKeys.length
}

export const useUpdateSubscription = ({
  accessToken,
  data,
  trigger
}) => {
  const context = useContext(SubscriptionContext)
  const { state, dispatch } = context

  const restPayload = getSubscriptionUpdatePayload(state)
  const payload = {
    ...restPayload,
    ...data
  }
  const isValidPayload = validateUpdateSubscriptionPayload(payload)

  if (!isValidPayload) {
    logger.warning(`Update subscription payload not valid: ${JSON.stringify(payload)}`)
  }

  const url = `${endpoint('core')}${routes.core.currentSubscription}`

  const [isLoading, response, error] = useFetch({
    url,
    trigger,
    needsAuthorization: true,
    accessToken,
    options: {
      method: 'PUT',
    },
    parameters: payload
  })

  useEffect(() => {
    if (!isLoading && response && !error) {
      dispatch({
        type: actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED,
        data: {
          subscription: response.result.data
        }
      })
    }
  }, [dispatch, response, error, isLoading])

  return [isLoading, (!!response && !error), error]
}
