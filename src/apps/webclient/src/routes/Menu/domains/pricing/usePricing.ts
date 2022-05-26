import { useSelector } from 'react-redux'
import useSWR from 'swr'

import endpoint from 'config/endpoint'
import { postFetcher } from 'routes/Menu/apis/fetch'
import { getOrderV2 } from 'routes/Menu/selectors/order'
import { transformOrderPricesV2ToOrderV1 } from 'routes/Menu/transformers/orderPricesV2ToV1'
import { getBasketRecipesCount, getBasketSlotId } from 'selectors/basket'

import { useAuth } from '../auth'

export type Pricing = {
  flatDiscountApplied: boolean
  items: any[]
  promoCodeValid: boolean
  amountOff: string | null
  deliveryTotal: string | null
  grossTotal: string | null
  percentageOff: string | null
  pricePerPortion: string | null
  pricePerPortionDiscounted: string | null
  productTotal: string | null
  promoCode: string | null
  recipeDiscount: string | null
  recipeTotal: string | null
  recipeTotalDiscounted: string | null
  surchargeTotal: string | null
  total: string | null
  totalDiscount: string | null
  vatCharged: string | null
}

const useGetPricing = (shouldFetch: boolean): { error: Error | null; data: Pricing | null } => {
  const { accessToken, authUserId } = useAuth()
  const orderRequest = useSelector(getOrderV2)
  // eslint-disable-next-line no-unused-expressions
  let url = `${endpoint('order', 2)}/prices`
  const promo = (orderRequest as any)?.attributes?.prices?.promo_code
  if (promo) url += `?promo=${promo}`
  const params = shouldFetch ? [url, { data: orderRequest }, accessToken, authUserId] : null
  const { data: response, error } = useSWR<{ data: any; included: any }, Error>(
    params,
    postFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  if (error && url) {
    return { error, data: null }
  }

  return { error: null, data: response ? transformOrderPricesV2ToOrderV1(response).data : null }
}

/**
 * @typedef {Object} PricingHookResponse
 * @property {object} pricing - Can also be null or undefined, will return the pricing data if available
 * @property {boolean} isPending - will return the loading state of the fetch call.
 * @property {boolean} isValid - is true when there's sufficient data to query the `/pricing` endpoint and therefore receive real data.
 */

/**
 * Returns the current prices calculated on the base of the items in the basket and promocodes
 * Using SWR will trigger an api call only once for each set of params
 * @returns { PricingHookResponse }
 */
export const usePricing = (): {
  pricing?: Pricing | null
  isPending: boolean
  isValid: boolean
} => {
  const deliverySlotId = useSelector(getBasketSlotId)
  const recipesCount = useSelector(getBasketRecipesCount)
  const shouldFetch = recipesCount > 1 && !!deliverySlotId
  const { error, data } = useGetPricing(shouldFetch)

  return {
    isPending: !data && !error && shouldFetch,
    isValid: shouldFetch,
    pricing: data,
  }
}
