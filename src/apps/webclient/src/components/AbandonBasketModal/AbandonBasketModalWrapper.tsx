import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { AbandonBasketModal } from './AbandonBasketModal'

const AbandonBasketModalWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()

  return (
    <AbandonBasketModal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
    />
  )
}

export { AbandonBasketModalWrapper }
