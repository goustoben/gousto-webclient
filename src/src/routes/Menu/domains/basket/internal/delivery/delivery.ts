import { useAddress, useDate } from './fields'

export const useBasketDelivery = () => ({
  ...useAddress(),
  ...useDate(),
})
