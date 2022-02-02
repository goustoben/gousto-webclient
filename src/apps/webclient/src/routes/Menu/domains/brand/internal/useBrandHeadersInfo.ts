import useSWR from 'swr'
import endpoint from 'config/endpoint'
import { getFetcher } from 'routes/Menu/apis/fetch'
import { useAuth } from '../../auth'
import { MenuHeadersBrandData, MenuHeadersIncludesData } from '../types'

const url = `${endpoint('brand')}/menu-headers`

/**
 * Get the Brand Headers data from BrandAPI
 * @returns Brand data as coming from the server side
 */
export const useBrandHeadersInfo: () => {
  error?: Error
  collectionsPerMenu?: MenuHeadersBrandData
  headers?: MenuHeadersIncludesData
} = () => {
  const { accessToken, authUserId} = useAuth()

  const requestParameters = null

  const { data: response, error } = useSWR<{data: MenuHeadersBrandData, included: MenuHeadersIncludesData}, Error>(
    [url, requestParameters, accessToken, authUserId],
    getFetcher,
    // The Brand Headers info is an immutable resource (does not chang within user's session)
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  if (!response?.data && !response?.included) {
    return { error: error || Error('Failed to fetch Brand Headers information from server side.') }
  }

  return {
    collectionsPerMenu: response.data,
    headers: response.included,
  }
}
