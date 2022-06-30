import { BareFetcher } from 'swr'
import { MenuAPIQueryData, MenuAPIResponse } from './response'
import { useHTTPGet } from './useHTTPGet'

export type UseMenuSWRArgs = {
  accessToken: string;
  authUserId: string;

  // getFetcher needs to be passed in, because it currently lives in webclient main module
  // this will allow us to reduce the amount of work needed for this initial implementation
  getFetcher: BareFetcher<MenuAPIResponse>;

  // endpointUrl is passed in so we don't need to use the endpoint() function from webclient
  // (same reason as getFetcher)
  endpointUrl: string;

  requestData: MenuAPIQueryData;
}

const successReturn = (response: MenuAPIResponse) => ({
  isPending: false,
  response: response.result,
  error: null,
})

const pendingReturn = () => ({
  isPending: true,
  response: {} as MenuAPIResponse['result'],
  error: null,
})

const errorReturn = (error: Error) => ({
  isPending: false,
  response: {} as MenuAPIResponse['result'],
  error,
})

/**
 * Use SWR to request /menus from menu service
 *
 * @param {UseMenuSWRArgs} args - Args for the hook
 * @param {string} args.endpointUrl - /menus endpoint url
 * @param {BaseFetcher<MenuAPIResponse>} args.getFetcher - Fetcher for use in SWR (passed in for compatibility with webclient)
 */
export function useMenuSWR({ accessToken, authUserId, endpointUrl, getFetcher, requestData }: UseMenuSWRArgs) {
  const { data: response, error } = useHTTPGet<MenuAPIResponse, MenuAPIQueryData>({
    accessToken,
    authUserId,

    url: endpointUrl,
    getFetcher,

    // TODO is this correct?
    immutable: true,

    requestData
  })

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

  return successReturn(response)
}
