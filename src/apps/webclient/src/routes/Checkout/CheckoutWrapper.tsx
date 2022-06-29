import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'
import { usePricing } from 'routes/Menu/domains/pricing'

import { Checkout } from './Checkout'
import { useSubmitOrder } from './useSubmitOrder'

const CheckoutWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()
  const { pricing } = usePricing()
  const submitOrder = useSubmitOrder()

  return (
    <Checkout
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
      prices={pricing}
      submitOrder={submitOrder}
    />
  )
}

export { CheckoutWrapper }
