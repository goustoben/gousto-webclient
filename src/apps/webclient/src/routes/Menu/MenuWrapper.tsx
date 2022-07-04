import React from 'react'

import { useDispatch } from 'react-redux'

import { useBasket } from 'routes/Menu/domains/basket'

import { Menu } from './Menu'
import { menuOverlayClick } from './actions/menuOverlayClick'

const MenuWrapper = (ownProps: any) => {
  const dispatch = useDispatch()
  const { addRecipe, removeRecipe } = useBasket()

  const onOverlayClick = React.useCallback(() => {
    dispatch(menuOverlayClick(removeRecipe))
  }, [dispatch, removeRecipe])

  return (
    <Menu
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
      onOverlayClick={onOverlayClick}
    />
  )
}

export { MenuWrapper }
