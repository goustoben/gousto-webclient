import Immutable from 'immutable'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { getIsAuthenticated } from 'selectors/auth'
import { Pricing, usePricing } from 'routes/Menu/domains/pricing'
import { getPromoCode } from 'selectors/basket'
import { getPromoStore } from 'selectors/promoStoreSelectors'

export type DiscountDescriptor = {
  isDiscountEnabled: boolean
  discountKind?: 'flat' | 'percentage'
  discountAmount?: string
}

const isPositive = (price?: string | null): boolean => {
  if (!price) {
    return false
  }
  const parsed = Number.parseFloat(price)
  return !Number.isNaN(parsed) && parsed > 0
}

const getDiscountFromPricing = (pricing?: Pricing | null): DiscountDescriptor => {
  if (!pricing) {
    return {
      isDiscountEnabled: false,
    }
  }
  const { flatDiscountApplied, amountOff, percentageOff } = pricing
  if (flatDiscountApplied && isPositive(amountOff)) {
    return {
      isDiscountEnabled: true,
      discountKind: 'flat',
      discountAmount: amountOff as string,
    }
  } else if (isPositive(percentageOff)) {
    return {
      isDiscountEnabled: true,
      discountKind: 'percentage',
      discountAmount: percentageOff as string,
    }
  } else {
    return {
      isDiscountEnabled: false,
    }
  }
}

export const getDiscountFromStore = createSelector(
  getPromoCode,
  getPromoStore,
  (promoCode: string | undefined, promoStore: Immutable.Map<string, any>): DiscountDescriptor => {
    const promoCodeDetails = promoStore.getIn([promoCode, 'details'])
    if (!promoCodeDetails) {
      return {
        isDiscountEnabled: false,
      }
    }

    const amountOff = promoCodeDetails.get('discount-whole-order-amount', null)
    const percentageOff = promoCodeDetails.get('discount-whole-order-percent', null)

    if (isPositive(amountOff)) {
      return {
        isDiscountEnabled: true,
        discountKind: 'flat',
        discountAmount: amountOff,
      }
    } else if (isPositive(percentageOff)) {
      return {
        isDiscountEnabled: true,
        discountKind: 'percentage',
        discountAmount: percentageOff,
      }
    } else {
      return {
        isDiscountEnabled: false,
      }
    }
  },
)

/**
 * Returns the descriptor for currently-applicable discount.
 */
export const useDiscountDescriptor = (): DiscountDescriptor => {
  const { pricing } = usePricing()
  const isAuthenticated = useSelector<unknown, boolean>(getIsAuthenticated)

  // For new users, the promo code discount is extracted from the `promoStore`
  // slice based on the current promo code stored in the `basket` slice.
  // For existing users, from the pricing hook.
  const discountForNewUsers = useSelector<unknown, DiscountDescriptor>(getDiscountFromStore)

  const result = isAuthenticated ? getDiscountFromPricing(pricing) : discountForNewUsers

  return result
}

/**
 * Returns discount tip for display.
 */
export const formatDiscountTip = (discountDescriptor: DiscountDescriptor): string | null => {
  const { isDiscountEnabled, discountKind, discountAmount } = discountDescriptor
  if (!isDiscountEnabled) {
    return null
  }
  const formattedAmount = Math.ceil(parseFloat(discountAmount as string))
  const discountTip =
    discountKind === 'flat'
      ? `£${formattedAmount} off your box`
      : `${formattedAmount}% off your box`

  return discountTip
}
