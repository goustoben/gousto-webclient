import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { Buttons } from './Buttons'

const ButtonsWrapper = (ownProps: any) => {
  const { addRecipe, removeRecipe } = useBasket()

  return (
    <Buttons
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipe={addRecipe}
      removeRecipe={removeRecipe}
    />
  )
}

export { ButtonsWrapper }
