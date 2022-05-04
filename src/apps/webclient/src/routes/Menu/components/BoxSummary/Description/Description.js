import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
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
  } else if (isDiscountEnabled) {
    content = '+ Free UK delivery'
  } else {
    content = '7 days a week'
  }

  return content
}

const Description = ({ numRecipes, view }) => {
  const canCheckout = numRecipes >= basketConfig.minRecipesNum
  const content = useSimplifyBasketBarContent(canCheckout)

  return (
    <p
      className={classNames(css.description, {
        [css.canCheckout]: canCheckout,
      })}
    >
      {content}
    </p>
  )
}

Description.propTypes = {
  view: PropTypes.string.isRequired,
  numRecipes: PropTypes.number.isRequired,
}

Description.defaultProps = {}

export { Description }
