import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { getIsSimplifyBasketBarEnabled } from 'selectors/features'
import basketConfig from 'config/basket'
import { useCheckoutPrices, useDiscountTip } from 'routes/Menu/components/BoxSummary/utilHooks'
import css from './Description.css'

const useSimplifyBasketBarContent = (canCheckout) => {
  const discountTip = useDiscountTip()
  const { isDiscountEnabled } = useCheckoutPrices()

  let content
  if (canCheckout) {
    if (isDiscountEnabled) {
      content = discountTip
    } else {
      content = 'Free UK delivery'
    }
  } else {
    if (isDiscountEnabled) {
      content = '+ Free UK delivery'
    } else {
      content = '7 days a week'
    }
  }
  return content
}

const Description = ({ numPortions, numRecipes, view, deliveryOptions, warning }) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)
  const canCheckout = numRecipes >= basketConfig.minRecipesNum
  const simplifyBasketBarContent = useSimplifyBasketBarContent(canCheckout)

  if (isSimplifyBasketBarEnabled) {
    return (
      <p
        className={classNames(css[`description${view}`], css.isSimplifyBasketBarEnabled, {
          [css.canCheckout]: canCheckout,
        })}
      >
        {simplifyBasketBarContent}
      </p>
    )
  }

  let statusText = `Choose 2, 3 or 4 meals for ${numPortions} people`
  if (numRecipes > 0) {
    statusText = `${numRecipes} meal${numRecipes > 1 ? 's' : ''} for ${numPortions} people added`
  }
  if (deliveryOptions) {
    statusText = 'Select delivery options'
  }
  if (warning) {
    statusText = (
      <span>
        <span className={css.warningIcon} /> There&apos;s been a change in your box
      </span>
    )
  }

  return <p className={css[`description${view}`]}>{statusText}</p>
}

Description.propTypes = {
  view: PropTypes.string.isRequired,
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  deliveryOptions: PropTypes.bool,
  warning: PropTypes.bool,
}

Description.defaultProps = {
  deliveryOptions: false,
  warning: false,
}

export { Description }
