import { useEffect } from 'react'

import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { useFetch } from '../../../../hooks/useFetch'
import {
} from '../context'

import { actionTypes } from '../context/reducers'

export const useOrdersData = (accessToken, dispatch) => {
  const ordersUrl = `${endpoint('core')}${routes.core.userOrders}`

  const parameters = {
    limit: 10,
    sort_order: 'desc',
    state: 'pending'
  }

  const [, ordersResponse, ordersError] = useFetch({
    url: ordersUrl,
    needsAuthorization: true,
    parameters,
    accessToken
  })

  useEffect(() => {
    if (!ordersError && ordersResponse && ordersResponse.result) {
      dispatch({
        type: actionTypes.ORDERS_DATA_RECEIVED,
        data: ordersResponse.result.data,
      })
    }
  }, [dispatch, ordersError, ordersResponse])
}
