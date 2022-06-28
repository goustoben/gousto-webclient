import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { Home } from './Home'

const HomeWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()

  return (
    <Home
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
    />
  )
}

export { HomeWrapper }
