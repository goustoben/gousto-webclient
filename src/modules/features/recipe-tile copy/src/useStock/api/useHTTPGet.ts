import useSWR, { BareFetcher } from 'swr'
import { useAuth } from '../../utils/auth'

type UseHTTPGetArgs<TResponse> = {
  getFetcher: BareFetcher<TResponse>;
  immutable?: boolean;
  url: string | null;
}

/**
 * Use SWR to make an HTTP get request
 *
 * If `url` is `null`, no request will be made
 *
 * @param {UseHTTPGetArgs<TResponse>} args - Args for the hook
 * @param {string} args.url - URL to call, or null to skip request
 * @param {string} args.immutable - Whether the resource should be revalidated
 * @param {BaseFetcher<StockAPIResponse>} args.getFetcher - Fetcher for use in SWR (passed in for compatibility with webclient)
 */
export function useHTTPGet<TResponse>(args: UseHTTPGetArgs<TResponse>) {
  const { getFetcher, immutable = false, url } = args
  const { accessToken, authUserId } = useAuth()

  const shouldFetch = url !== null

  // it's a GET, no params
  const requestParameters = null

  return useSWR<TResponse>(
    shouldFetch
      ? [ url, requestParameters, accessToken, authUserId ]
      : null,

    getFetcher,

    {
      revalidateIfStale: !immutable,
      revalidateOnFocus: !immutable,
      revalidateOnReconnect: !immutable,
    }
  )
}
