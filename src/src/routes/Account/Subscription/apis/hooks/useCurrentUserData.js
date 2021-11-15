import { useEffect, } from 'react'

import endpoint from 'config/endpoint'
import { useFetch } from 'hooks/useFetch'

import { actionTypes } from '../../context/reducers'
import { currentUserRoute } from "config/routes/core/currentUserRoute"

export const useCurrentUserData = (accessToken, dispatch) => {
  const currentUserUrl = `${endpoint('core')}${currentUserRoute}`

  const [, currentUserResponse, currentUserError] = useFetch({
    url: currentUserUrl,
    needsAuthorization: true,
    accessToken
  })

  useEffect(() => {
    if (!currentUserError && currentUserResponse && currentUserResponse.result) {
      dispatch({
        type: actionTypes.CURRENT_USER_DATA_RECEIVED,
        data: currentUserResponse.result.data,
      })
    }
  }, [dispatch, currentUserError, currentUserResponse])
}
