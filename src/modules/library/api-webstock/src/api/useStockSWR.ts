import { useMemo } from 'react';
import { BareFetcher } from 'swr'
import { StockAPIData, StockAPIResponse } from './response'
import { useHTTPGet } from './useHTTPGet'

/**
 * Arguments to be used when making the HTTP query.
 */
export type UseStockSWRArgs = {
  accessToken: string;
  authUserId: string;

  // getFetcher needs to be passed in, because it currently lives in webclient main module
  // this will allow us to reduce the amount of work needed for this initial implementation
  getFetcher: BareFetcher<StockAPIResponse>;

  /**
   * coreUrl is passed in so we don't need to use the endpoint() function from webclient
   */
  coreUrl: string;

  /**
   * The delivery day ID to query for
   */
  deliveryDayId: string | null;
}

const successReturn = (stock: StockAPIData) => ({
  isPending: false,
  stock,
  error: null,
})

const pendingReturn = () => ({
  isPending: true,
  stock: {} as StockAPIData,
  error: null,
})

const errorReturn = (error: Error) => ({
  isPending: false,
  stock: {} as StockAPIData,
  error,
})

/**
 * Use SWR to request stock from core for the given delivery day
 *
 * @param {UseStockSWRArgs} args - Args for the hook
 * @param {string} args.deliveryDayId - Delivery day for the endpoint url
 * @param {string} args.coreUrl - Base core URL
 * @param {BaseFetcher<StockAPIResponse>} args.getFetcher - Fetcher for use in SWR (passed in for compatibility with webclient)
 */
export function useStockSWR({ accessToken, authUserId, deliveryDayId, coreUrl, getFetcher }: UseStockSWRArgs) {
  const url = deliveryDayId
    ? `${coreUrl}/delivery_day/${deliveryDayId}/stock`
    : null

  const { data: response, error } = useHTTPGet<StockAPIResponse>({
    accessToken,
    authUserId,

    url,
    getFetcher,

    // TODO is this correct?
    immutable: true,
  })

  return useMemo(() => {
    if (error) {
      return errorReturn(error)
    }

    if (!response) {
      return pendingReturn()
    }

    if (response.status !== 'ok') {
      // TODO what does a not-ok response look like? anything useful we can bubble up?
      return errorReturn(response.status)
    }

    return successReturn(response.result.data)

  }, [response, error])
}
