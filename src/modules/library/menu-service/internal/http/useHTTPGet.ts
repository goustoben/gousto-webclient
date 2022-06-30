import useSWR, { BareFetcher } from 'swr'

type UseHTTPGetArgs<TResponse, TData> = {
  accessToken: string;
  authUserId: string;

  getFetcher: BareFetcher<TResponse>;
  immutable?: boolean;
  url: string | null;
  requestData?: TData;
}

/**
 * Use SWR to make an HTTP get request
 * 
 * TODO: this should be replaced by the FEF http module, when available
 *
 * If `url` is `null`, no request will be made
 *
 * @param {UseHTTPGetArgs<TResponse>} args - Args for the hook
 * @param {string} args.url - URL to call, or null to skip request
 * @param {string} args.immutable - Whether the resource should be revalidated
 * @param {BaseFetcher<TResponse>} args.getFetcher - Fetcher for use in SWR (passed in for compatibility with webclient)
 */
export function useHTTPGet<TResponse, TData>(args: UseHTTPGetArgs<TResponse, TData>) {
  const { accessToken, authUserId, getFetcher, requestData, immutable = false, url } = args

  const shouldFetch = url !== null

  return useSWR<TResponse>(
    shouldFetch
      ? [ url, requestData, accessToken, authUserId ]
      : null,

    getFetcher,

    {
      revalidateIfStale: !immutable,
      revalidateOnFocus: !immutable,
      revalidateOnReconnect: !immutable,
    }
  )
}
