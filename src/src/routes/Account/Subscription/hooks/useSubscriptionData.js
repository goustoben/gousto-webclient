import {
  useEffect,
  useMemo,
} from 'react'
import moment from 'moment'

import endpoint from 'config/endpoint'
import routes from 'config/routes'

import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'
import { buildSubscriptionQueryUrl } from '../../apis/subscription'
import { useFetch } from '../../../../hooks/useFetch'
import {
  getCurrentUserId,
  getCurrentUserPostcode,
  getCurrentUserDeliveryTariffId
} from '../context/selectors/currentUser'
import { actionTypes } from '../context/reducers'
import { mapSubscriptionPayload, getSubscriptionDeliverySlot } from '../utils/mapping'

export const useSubscriptionData = (
  accessToken,
  dispatch,
  triggerDeliveryDays,
  triggerSubscription,
  state
) => {
  const userId = getCurrentUserId(state)
  const postcode = getCurrentUserPostcode(state)
  const deliveryTariffId = getCurrentUserDeliveryTariffId(state)
  const deliveriesUrl = `${endpoint('deliveries')}${routes.deliveries.days}`
  const deliveryParams = useMemo(() => ({
    'filters[cutoff_datetime_from]': moment().startOf('day').toISOString(),
    'filters[cutoff_datetime_until]': moment()
      .startOf('day')
      .add(7, 'days')
      .toISOString(),
    postcode,
    sort: 'date',
    direction: 'asc',
    delivery_tariff_id: deliveryTariffId
  }), [postcode, deliveryTariffId])
  const subscriptionUrl = buildSubscriptionQueryUrl(userId, routes.subscriptionQuery.subscriptions)

  useEffect(() => {
    if (userId) {
      triggerSubscription.setShouldRequest(true)
    }
  }, [userId, triggerSubscription])

  useEffect(() => {
    if (postcode) {
      triggerDeliveryDays.setShouldRequest(true)
    }
  }, [postcode, triggerDeliveryDays])

  const [, subscriptionResponse, subscriptionError
  ] = useFetch({
    url: subscriptionUrl,
    needsAuthorization: true,
    accessToken,
    trigger: triggerSubscription,
  })

  const [, deliveriesResponse, deliveriesError
  ] = useFetch({
    url: deliveriesUrl,
    parameters: deliveryParams,
    accessToken,
    trigger: triggerDeliveryDays,
  })

  useEffect(() => {
    const hasAnyErrors = deliveriesError || subscriptionError
    const allRequestsComplete = deliveriesResponse && subscriptionResponse

    if (!hasAnyErrors && allRequestsComplete) {
      const { subscription, box, projected } = mapSubscriptionPayload(subscriptionResponse.data.subscription)
      const deliveries = deliveriesResponse.data.map(parseObjectKeysToCamelCase)

      const data = {
        deliveries,
        subscription: {
          subscription: {
            ...subscription,
            deliverySlotId: getSubscriptionDeliverySlot(subscription, deliveries),
          },
          box,
          projected
        },
      }

      dispatch({
        type: actionTypes.SUBSCRIPTION_DATA_RECEIVED,
        data
      })
    }
  }, [
    deliveriesResponse,
    subscriptionResponse,
    dispatch,
    deliveriesError,
    subscriptionError,
  ])
}
