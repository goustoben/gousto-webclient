import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { DeliverySlot } from './DeliverySlot'

const DeliverySlotWrapper = (ownProps: any) => {
  const { removeRecipe } = useBasket()

  return (
    <DeliverySlot
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      removeRecipeFromBasket={removeRecipe}
    />
  )
}

export { DeliverySlotWrapper }
