import { useEffect } from 'react'

import endpoint from 'config/endpoint'
import { useFetch } from 'hooks/useFetch'

import { actionTypes } from '../../context/reducers'
import { userOrdersRoute } from "config/routes/core/userOrdersRoute"

export const useOrdersData = (accessToken, dispatch) => {
  const ordersUrl = `${endpoint('core')}${userOrdersRoute}`

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
