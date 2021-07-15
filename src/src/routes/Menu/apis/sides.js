import endpoint from 'config/endpoint'
import { post } from './fetch'
import { getRequestHeaders } from './_utils'

export const getSidesForOrder = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  return post(accessToken, `${endpoint('menu', 1)}/sides`, { data: order }, headers)
}
