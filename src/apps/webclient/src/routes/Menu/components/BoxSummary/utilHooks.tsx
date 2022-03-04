import React, { ReactNode, useCallback, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePrevious } from 'react-use'
import { getIsAuthenticated } from 'selectors/auth'
import { Pricing, usePricing } from 'routes/Menu/domains/pricing'

/**
 * Checkout prices information for display purposes
 */
export interface CheckoutPrices {
  isDiscountEnabled: boolean
  /**
   * If true, discount is monetary value, percentage value otherwise.
   */
  isDiscountFlat?: boolean
  discountAmount?: number | null
  /**
   * Price without discounts applied.
   */
  grossPrice?: number
  /**
   * Price with discounts applied.
   */
  totalPrice?: number
}

/**
 * Returns either "amountOff" or "percentageOff" number value depending on "flatDiscountApplied" field
 * @returns {number} - discount amount
 */
const getPercentageOrAmountOff = (
  pricing?: Pricing | null
): Pricing['amountOff'] | Pricing['percentageOff'] | undefined => {
  const flatDiscountApplied = pricing?.flatDiscountApplied

  return pricing?.[flatDiscountApplied ? 'amountOff' : 'percentageOff']
}

/**
 * Returns gross & total prices and discount percentage or amount for current order.
 */
export const useCheckoutPrices = (): CheckoutPrices => {
  const { pricing } = usePricing()
  const grossPrice = Number(pricing?.grossTotal)
  const totalPrice = Number(pricing?.recipeTotalDiscounted)
  const isAuthenticated = useSelector<unknown, boolean>(getIsAuthenticated)

  // for authenticated users promocode discount is extracted from store.pricing slice
  const existingUsersDiscountAmount = getPercentageOrAmountOff(pricing)
  const isPricingDiscountFlat = pricing?.flatDiscountApplied
  // const isPricingDiscountEnabled = useSelector<any, boolean>(getPromoCodeValid)
  // TODO revert to line above once API is fixed
  const isPricingDiscountEnabled =
    existingUsersDiscountAmount !== null && existingUsersDiscountAmount !== undefined

  // for new users promocode discount is extracted from store.promocode slice
  const promocodeName = pricing?.promoCode
  /**
   * Returns discount amount number and if flat discount enabled; e.g. [discountAmount, isDiscountFlat]
   */
  const extractDiscountFromStore = useCallback(
    (state: any): [number, boolean] => {
      const promocodeDetails = state.promoStore?.getIn([promocodeName, 'details'])
      const flatDiscount = promocodeDetails?.get('discount-whole-order-amount')
      const percentageDiscount = promocodeDetails?.get('discount-whole-order-percent')
      const isDiscountFlat = flatDiscount && !percentageDiscount

      return [isDiscountFlat ? flatDiscount : percentageDiscount, isDiscountFlat]
    },
    [promocodeName]
  )
  const [newUsersDiscountAmount, isDiscountFlat] = useSelector<any, [number, boolean]>(
    extractDiscountFromStore
  )
  const isDiscountEnabled = !!newUsersDiscountAmount

  return {
    grossPrice,
    totalPrice,
    isDiscountEnabled: isAuthenticated ? isPricingDiscountEnabled : isDiscountEnabled,
    isDiscountFlat: isAuthenticated ? isPricingDiscountFlat : isDiscountFlat,
    discountAmount: Number(isAuthenticated ? existingUsersDiscountAmount : newUsersDiscountAmount),
  }
}

/**
 * Returns true if checkout button counter animation needs to be played; returns false otherwise.
 * @param {number} counterValue - current counter value
 * @returns - flag is animation should be played and 'onanimationend' callback
 */
export const useCheckoutCounterAnimation = (counterValue: number): [boolean, () => void] => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState<boolean>(false)
  const oldCounterValue = usePrevious(counterValue)
  const onAnimationEnd = useCallback(() => setShouldPlayAnimation(false), [])
  useLayoutEffect(() => {
    if (oldCounterValue !== counterValue) {
      setShouldPlayAnimation(true)
    }
  }, [oldCounterValue, counterValue])

  return [shouldPlayAnimation, onAnimationEnd]
}

/**
 * Returns discount tip for display.
 */
export const useDiscountTip = (): ReactNode => {
  const { isDiscountEnabled, isDiscountFlat, discountAmount } = useCheckoutPrices()
  if (!isDiscountEnabled) {
    return null
  }
  const discountTip = isDiscountFlat
    ? `£${discountAmount} off your box`
    : `${discountAmount}% off your box`

  return <>{discountTip}</>
}
