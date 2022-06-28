import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'

import { Menu } from './Menu'

const MenuWrapper = (ownProps: any) => {
  const { addRecipe } = useBasket()

  return (
    <Menu
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
    />
  )
}

export { MenuWrapper }
