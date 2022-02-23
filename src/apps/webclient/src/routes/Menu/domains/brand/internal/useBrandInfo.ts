import useSWR from 'swr'
import endpoint from 'config/endpoint'
import { getFetcher } from 'routes/Menu/apis/fetch'
import { useAuth } from '../../auth'
import { BrandData } from '../types'

const url = `${endpoint('brand')}/theme`

/**
 * Get the Brand data from BrandAPI
 * @returns Brand data as coming from the server side
 */
export const useBrandInfo: () => { error?: Error; brand?: BrandData } = () => {
  const { accessToken, authUserId } = useAuth()

  const requestParameters = null

  const { data: response, error } = useSWR<{ data: BrandData }, Error>(
    [url, requestParameters, accessToken, authUserId],
    getFetcher,
    // Treat the Brand info as an immutable resource, which is not changed
    // within user's session
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  if (!response?.data) {
    return { error: error || Error('Failed to fetch Brand information from server side.') }
  }

  return { brand: response.data }
}
