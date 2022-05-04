import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { useDiscountTip } from 'routes/Menu/components/BoxSummary/utilHooks'

import { Price } from '../../Price'
import { Description } from '../../Description'

import css from './PriceAndDiscountTip.css'

const deliveryTip = <b>Free UK delivery,</b>

export const PriceAndDiscountTip = ({ numRecipes }: any) => {
  const { pricing } = usePricing()
  const discountTip = useDiscountTip()

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
      <Description numRecipes={numRecipes} />
    </div>
  )
}

PriceAndDiscountTip.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}
