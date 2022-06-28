import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import Account from './Account'

const AccountWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()

  return (
    <Account
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
    />
  )
}

export { AccountWrapper }
