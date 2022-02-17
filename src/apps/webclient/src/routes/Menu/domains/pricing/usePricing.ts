import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'

import endpoint from 'config/endpoint'
import { postFetcher } from 'routes/Menu/apis/fetch'
import { getOrderV2 } from 'routes/Menu/selectors/order'
import { transformOrderPricesV2ToOrderV1 } from 'routes/Menu/transformers/orderPricesV2ToV1'
import { getBasketRecipesCount, getBasketSlotId } from 'selectors/basket'
import { pricingFailure, pricingPending, pricingReset, pricingSuccess } from 'actions/pricing'
import { useAuth } from '../auth'

type Pricing = {
  amountOff: string | null
  deliveryTotal: string | null
  flatDiscountApplied: boolean
  grossTotal: string | null
  items: any[]
  percentageOff: string | null
  pricePerPortion: string | null
  pricePerPortionDiscounted: string | null
  productTotal: string | null
  promoCode: string | null
  promoCodeValid: boolean
  recipeDiscount: string | null
  recipeTotal: string | null
  recipeTotalDiscounted: string | null
  surchargeTotal: string | null
  total: string | null
  totalDiscount: string | null
  vatCharged: string | null
}

const useGetPricing = (shouldFetch: boolean): { error: any; data: Pricing | null } => {
  const dispatch = useDispatch()
  const { accessToken, authUserId } = useAuth()
  const orderRequest = useSelector(getOrderV2)
  const url = `${endpoint('order', 2)}/prices`
  const params = shouldFetch ? [url, { data: orderRequest }, accessToken, authUserId] : null
  const { data: response, error } = useSWR<{ data: any; included: any }, Error>(
    params,
    postFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: () => {
        dispatch(
          pricingFailure(
            "Something's gone wrong signing you up, please try again or contact our customer care team."
          )
        )
      },
      onSuccess: (successResp) => {
        dispatch(pricingSuccess(transformOrderPricesV2ToOrderV1(successResp).data))
      },
    }
  )

  useEffect(() => {
    if (url && !response) {
      dispatch(pricingPending())
    }
  }, [url, response, dispatch])

  if (error && url) {
    return { error, data: null }
  }

  return { error: null, data: response ? transformOrderPricesV2ToOrderV1(response).data : null }
}

export const usePricing = (): {
  pricing?: Pricing | null
  pending: boolean
  isValid: boolean
} => {
  const dispatch = useDispatch()
  const deliverySlotId = useSelector(getBasketSlotId)
  const recipesCount = useSelector(getBasketRecipesCount)
  const shouldFetch = recipesCount > 1 && !!deliverySlotId
  const { error, data } = useGetPricing(shouldFetch)

  useEffect(() => {
    if (recipesCount < 2) {
      dispatch(pricingReset())
    }
  }, [recipesCount, dispatch])

  return {
    pending: !data && !error && shouldFetch,
    isValid: shouldFetch,
    pricing: data,
  }
}
