import useSWR from 'swr'

import endpoint from 'config/endpoint'

import { postFetcher } from './fetch'

export const useSides = ({ accessToken, userId, order, makeRequest = true }, options) => {
  const argumentsForPostFetcher = makeRequest
    ? [
        `${endpoint('menu', 1)}/sides`,
        // We have to use JSON.stringify on `order` cause our selectors
        // return new objects and create a mounting/request loop.
        JSON.stringify(order),
        accessToken,
        userId,
      ]
    : null

  // if null is provided to swr, it won't make a call to the API (postFetcher)
  return useSWR(argumentsForPostFetcher, postFetcher, options)
}
