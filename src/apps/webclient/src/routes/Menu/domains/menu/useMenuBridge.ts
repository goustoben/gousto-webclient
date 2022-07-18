import { useSelector } from 'react-redux'

import { useMenu as useMenuBase } from '@library/api-menu-service'

import endpoint from 'config/endpoint'
import { getFetcher } from 'routes/Menu/apis/fetch'
import { getAccessToken, getAuthUserId } from 'selectors/auth'
import { getNumPortions, getBasketDate } from 'selectors/basket'

import { useStock } from '../stock'
import { useMenuRequestArgs } from './internal/query'

/**
 * Bridge hook for interfacing between webclient and the menu-service module
 * to be removed later in the epic
 */
export function useMenu() {
  const accessToken = useSelector(getAccessToken)
  const authUserId = useSelector(getAuthUserId)
  const numPortions = useSelector(getNumPortions)
  const date = useSelector(getBasketDate)

  const { isRecipeInStock } = useStock()

  const requestData = useMenuRequestArgs()

  const requestArgs: Parameters<typeof useMenuBase>[0] = {
    accessToken,
    authUserId,
    getFetcher,
    endpointUrl: `${endpoint('menu')}/menus`,
    requestData,
  }

  const deps: Parameters<typeof useMenuBase>[2] = {
    numPortions,
    isRecipeInStock,
  }

  return useMenuBase(requestArgs, date, deps)
}
