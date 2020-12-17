import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'

export const reduceOrdersData = (state, orders) => {
  if (!orders) {
    return state
  }

  try {
    const camelCaseOrders = orders.map(parseObjectKeysToCamelCase)

    return {
      ...state,
      orders: camelCaseOrders.map((
        {
          phase,
          humanDeliveryDate,
        }) => ({
        phase,
        deliveryDate: humanDeliveryDate
      }))
    }
  } catch (error) {
    return state
  }
}
