import { useEffect, } from 'react'

import endpoint from 'config/endpoint'
import { useFetch } from 'hooks/useFetch'

import { actionTypes } from '../../context/reducers'
import { boxPricesRoute } from "config/routes/core/boxPricesRoute"

export const useBoxPricesData = (accessToken, dispatch) => {
  const boxPricesUrl = `${endpoint('core')}${boxPricesRoute}`

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
