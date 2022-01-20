import { createSelector } from 'reselect'

const getOrders = ({ orders }) => (orders || [])

export const getOpenOrders = createSelector(
  getOrders,
  (orders) => orders.filter(({ phase }) => phase === 'open')
)
