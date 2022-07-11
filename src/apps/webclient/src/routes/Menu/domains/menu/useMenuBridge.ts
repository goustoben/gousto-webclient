import { useSelector } from 'react-redux'

import { useMenu as useMenuBase } from '@library/api-menu-service'

import { getFetcher } from 'routes/Menu/apis/fetch'
import { getSelectedRecipeVariants } from 'routes/Menu/selectors/variants'
import { getAccessToken, getAuthUserId } from 'selectors/auth'
import { getNumPortions, getBasketDate } from 'selectors/basket'

import { useMenuRequestArgs } from './internal/query'

/**
 * Bridge hook for interfacing between webclient and the menu-service module
 * to be removed later in the epic
 */
export function useMenu() {
  const accessToken = useSelector(getAccessToken)
  const authUserId = useSelector(getAuthUserId)
  const numPortions = useSelector(getNumPortions)
  const selectedVariants = useSelector(getSelectedRecipeVariants)
  const date = useSelector(getBasketDate)

  const requestData = useMenuRequestArgs()

  const requestArgs: Parameters<typeof useMenuBase>[0] = {
    accessToken,
    authUserId,
    getFetcher,
    endpointUrl: '',
    requestData,
  }

  const deps: Parameters<typeof useMenuBase>[2] = {
    selectedRecipeVariants: selectedVariants,
    numPortions,
    isRecipeInStock: () => false,
  }

  return useMenuBase(requestArgs, date, deps)
}
