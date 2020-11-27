import {
  useEffect,
} from 'react'
import moment from 'moment'

import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { useFetch } from '../../../../hooks/useFetch'
import {
} from '../context'

import { actionTypes } from '../context/reducers'

export const useSubscriptionData = (accessToken, postcode, dispatch) => {
  const subscriptionUrl = `${endpoint('core')}${routes.core.currentSubscription}`

  const [, subscriptionResponse, subscriptionError
  ] = useFetch({
    url: subscriptionUrl,
    needsAuthorization: true,
    accessToken
  })

  const deliveriesUrl = `${endpoint('deliveries', routes.version.deliveries)}${routes.deliveries.days}`
  const deliveryParams = {
    'filters[cutoff_datetime_from]': moment().startOf('day').toISOString(),
    'filters[cutoff_datetime_until]': moment()
      .startOf('day')
      .add(7, 'days')
      .toISOString(),
    postcode,
    sort: 'date',
    direction: 'asc'
  }

  const [, deliveriesResponse, deliveriesError
  ] = useFetch({
    url: deliveriesUrl,
    parameters: deliveryParams,
    accessToken
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
