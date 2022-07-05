import React from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'

import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'

import { Price } from './Price'
import { useDiscountDescriptor, formatDiscountTip } from './priceAndDiscountTipUtils'

import css from './PriceAndDiscountTip.css'

type Props = {
  numRecipes: number
}

const Lines = ({ numRecipes }: Props) => {
  const { pricing, isPending } = usePricing()

  const discountDescriptor = useDiscountDescriptor()

  const discountTip = formatDiscountTip(discountDescriptor)

  const canCheckout = numRecipes >= basketConfig.minRecipesNum
  const { isDiscountEnabled } = discountDescriptor

  if (canCheckout && !isPending && pricing && pricing.grossTotal) {
    return (
      <>
        <div>
          <Price pricing={pricing} isPending={isPending} />
        </div>
        {isDiscountEnabled && <div className={css.bold}>{discountTip} off your box</div>}
        {!isDiscountEnabled && <div className={css.includingDelivery}> incl. delivery </div>}
      </>
    )
  } else if (canCheckout) {
    return (
      <>
        <div>
          <Price pricing={pricing} isPending={isPending} />
        </div>
      </>
    )
  } else if (isDiscountEnabled) {
    return (
      <>
        <div className={classNames(css.bold, css.discountApplied)}>{discountTip} off</div>
        <div>your Gousto box</div>
      </>
    )
  } else {
    return (
      <>
        <div className={classNames(css.bold, css.viewBasket)}>View Basket</div>
      </>
    )
  }
}

export const PriceAndDiscountTip = ({ numRecipes }: Props) => (
  <div className={css.priceAndDiscountTip}>
    <Lines numRecipes={numRecipes} />
  </div>
)

PriceAndDiscountTip.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}
