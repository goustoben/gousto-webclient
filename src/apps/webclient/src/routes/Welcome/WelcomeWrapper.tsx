import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { Welcome } from './Welcome'

const WelcomeWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()

  return (
    <Welcome
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
    />
  )
}

export { WelcomeWrapper }
