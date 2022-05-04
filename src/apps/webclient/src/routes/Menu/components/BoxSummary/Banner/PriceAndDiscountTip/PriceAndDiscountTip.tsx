import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { useCheckoutPrices, useDiscountTip } from 'routes/Menu/components/BoxSummary/utilHooks'

import { Price } from '../../Price'

import css from './PriceAndDiscountTip.css'

const deliveryTip = <b>Free UK delivery,</b>

const useSimplifyBasketBarContent = (canCheckout: boolean) => {
  const discountTip = useDiscountTip()
  const { isDiscountEnabled } = useCheckoutPrices()

  let content
  if (canCheckout) {
    if (isDiscountEnabled) {
      content = discountTip
    } else {
      content = 'Free UK delivery'
    }
  } else if (isDiscountEnabled) {
    content = '+ Free UK delivery'
  } else {
    content = '7 days a week'
  }

  return content
}

export const PriceAndDiscountTip = ({ numRecipes }: any) => {
  const { pricing } = usePricing()
  const discountTip = useDiscountTip()

  const canCheckout = numRecipes >= basketConfig.minRecipesNum
  const content = useSimplifyBasketBarContent(canCheckout)

  const titleContent =
    numRecipes < basketConfig.minRecipesNum ? (
      <div className={css.discountTip}>{discountTip || deliveryTip}</div>
    ) : (
      <Price
        recipeTotal={parseFloat(pricing?.grossTotal || '0')}
        recipeDiscount={parseFloat(pricing?.totalDiscount || '0')}
        recipeTotalDiscounted={parseFloat(pricing?.total || '0')}
      />
    )

  return (
    <div className={css.buttonTextWrapper}>
      <div className={classNames(css.titleWrapperVariant)}>{titleContent}</div>
      <p
        className={classNames(css.description, {
          [css.canCheckout]: canCheckout,
        })}
      >
        {content}
      </p>
    </div>
  )
}

PriceAndDiscountTip.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}
