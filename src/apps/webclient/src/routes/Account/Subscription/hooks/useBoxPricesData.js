import {
  useEffect,
} from 'react'

import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { useFetch } from '../../../../hooks/useFetch'
import {
} from '../context'

import { actionTypes } from '../context/reducers'

export const useBoxPricesData = (accessToken, dispatch) => {
  const boxPricesUrl = `${endpoint('core')}${routes.core.boxPrices}`

  const [, boxPricesResponse, boxPricesError] = useFetch({
    url: boxPricesUrl,
    needsAuthorization: true,
    accessToken
  })

  useEffect(() => {
    if (!boxPricesError && boxPricesResponse && boxPricesResponse.result) {
      dispatch({
        type: actionTypes.BOX_PRICES_DATA_RECEIVED,
        data: boxPricesResponse.result.data,
      })
    }
  }, [dispatch, boxPricesError, boxPricesResponse])
}
