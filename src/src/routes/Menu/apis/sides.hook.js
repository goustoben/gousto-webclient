import useSWR from 'swr'
import endpoint from 'config/endpoint'
import { getKy } from './_utils'

const postSides = async (order) => getKy().post(`${endpoint('menu', 1)}/sides`, { json: { data: order } }).json()

export const usePostSides = ({ order, makeRequest = true }, options) => useSWR(makeRequest ? [order] : null, postSides, options)

export const updateProducts = async (orderId, products) => getKy().post(`${endpoint('core')}/order/${orderId}/update-items`, { json: { data: products, _method: 'POST' } }).json()
