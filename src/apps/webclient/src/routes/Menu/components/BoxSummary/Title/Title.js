import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { useDiscountTip } from 'routes/Menu/components/BoxSummary/utilHooks'
import { Price } from '../Price'
import css from './Title.css'

const propTypes = {
  numRecipes: PropTypes.number,
}

const deliveryTip = <b>Free UK delivery,</b>
const defaultProps = {
  numRecipes: 0,
}

export function Title({ numRecipes }) {
  const { pricing } = usePricing()
  const discountTip = useDiscountTip()
  const titleContent =
    numRecipes < basketConfig.minRecipesNum ? (
      <div className={css.discountTip}>{discountTip || deliveryTip}</div>
    ) : (
      <Price
        recipeTotal={parseFloat(pricing?.grossTotal || 0)}
        recipeDiscount={parseFloat(pricing?.totalDiscount || 0)}
        recipeTotalDiscounted={parseFloat(pricing?.total || 0)}
      />
    )

  return <div className={classNames(css.titleWrapperVariant)}>{titleContent}</div>
}

Title.defaultProps = defaultProps
Title.propTypes = propTypes
