import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { MyGousto } from './MyGousto'

const MyGoustoWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()

  return (
    <MyGousto
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
    />
  )
}

export { MyGoustoWrapper }
