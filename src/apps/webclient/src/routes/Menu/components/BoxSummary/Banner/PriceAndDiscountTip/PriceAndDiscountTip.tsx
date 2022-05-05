import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { useCheckoutPrices, useDiscountTip } from 'routes/Menu/components/BoxSummary/utilHooks'

import { Price } from './Price'

import css from './PriceAndDiscountTip.css'

const Lines = ({ numRecipes }: any) => {
  const { pricing, isPending } = usePricing()

  const discountTip = useDiscountTip()

  const canCheckout = numRecipes >= basketConfig.minRecipesNum
  const checkoutPrices = useCheckoutPrices()
  const { isDiscountEnabled } = checkoutPrices

  if (canCheckout) {
    return (
      <>
        <div>
          <Price pricing={pricing!} isPending={isPending} />
        </div>
        <div className={css.bold}>{isDiscountEnabled ? discountTip : 'Free UK delivery'}</div>
      </>
    )
  } else if (isDiscountEnabled) {
    return (
      <>
        <div className={classNames(css.bold)}>{discountTip}</div>
        <div>+ Free UK delivery</div>
      </>
    )
  } else {
    return (
      <>
        <div className={classNames(css.bold)}>Free UK delivery,</div>
        <div>7 days a week</div>
      </>
    )
  }
}

export const PriceAndDiscountTip = ({ numRecipes }: any) => (
  <div className={css.priceAndDiscountTip}>
    <Lines numRecipes={numRecipes} />
  </div>
)

PriceAndDiscountTip.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}
