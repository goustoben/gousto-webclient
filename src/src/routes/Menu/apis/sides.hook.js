import useSWR from 'swr'
import endpoint from 'config/endpoint'
import { postFetcher } from './fetch'

export const useSides = ({ accessToken, userId, order }, options) => useSWR([
  `${endpoint('menu', 1)}/sides`,
  order,
  accessToken,
  userId,
], postFetcher, options)
