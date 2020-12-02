import {
  useEffect,
} from 'react'

import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { useFetch } from '../../../../hooks/useFetch'
import {
} from '../context'

import { actionTypes } from '../context/reducers'

export const useCurrentUserData = (accessToken, dispatch) => {
  const currentUserUrl = `${endpoint('core')}${routes.core.currentUser}`

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
