import {
  useEffect,
  useMemo,
} from 'react'
import moment from 'moment'

import endpoint from 'config/endpoint'
import routes from 'config/routes'

import { useFetch } from '../../../../hooks/useFetch'
import {
} from '../context'
import { getCurrentUserPostcode } from '../context/selectors/currentUser'
import { actionTypes } from '../context/reducers'

export const useSubscriptionData = (accessToken, dispatch, trigger, state) => {
  const postcode = getCurrentUserPostcode(state)
  const subscriptionUrl = `${endpoint('core')}${routes.core.currentSubscription}`
  const deliveriesUrl = `${endpoint('deliveries', routes.version.deliveries)}${routes.deliveries.days}`
  const deliveryParams = useMemo(() => ({
    'filters[cutoff_datetime_from]': moment().startOf('day').toISOString(),
    'filters[cutoff_datetime_until]': moment()
      .startOf('day')
      .add(7, 'days')
      .toISOString(),
    postcode,
    sort: 'date',
    direction: 'asc'
  }), [postcode])

  const [, subscriptionResponse, subscriptionError
  ] = useFetch({
    url: subscriptionUrl,
    needsAuthorization: true,
    accessToken
  })

  useEffect(() => {
    if (postcode) {
      trigger.setShouldRequest(true)
    }
  }, [postcode, trigger])

  const [, deliveriesResponse, deliveriesError
  ] = useFetch({
    url: deliveriesUrl,
    parameters: deliveryParams,
    accessToken,
    trigger,
  })

  useEffect(() => {
    const hasAnyErrors = deliveriesError || subscriptionError
    const allRequestsComplete = deliveriesResponse && subscriptionResponse

    if (!hasAnyErrors && allRequestsComplete) {
      const data = {
        deliveries: deliveriesResponse.data,
        subscription: subscriptionResponse.result.data
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
    subscriptionError
  ])
}
