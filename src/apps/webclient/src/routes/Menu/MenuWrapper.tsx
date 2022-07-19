import React, { useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { menuReceiveMenu } from 'actions/menuActionHelper'
import { useBasket } from 'routes/Menu/domains/basket'

import { Menu } from './Menu'
import { menuOverlayClick } from './actions/menuOverlayClick'
import { useMenu } from './domains/menu'

/**
 * Patch data in from the new Menu Service module into the Redux store
 */
function useMenuServiceModulePatch() {
  const dispatch = useDispatch()
  const { menuRecipes } = useMenu()

  useEffect(() => {
    dispatch(menuReceiveMenu(menuRecipes))
  }, [dispatch, menuRecipes])
}

const MenuWrapper = (ownProps: any) => {
  const dispatch = useDispatch()
  const { addRecipe, removeRecipe } = useBasket()

  useMenuServiceModulePatch()

  const memQuery = useMemo(() => ownProps.query, [])

  const onOverlayClick = React.useCallback(() => {
    dispatch(menuOverlayClick(removeRecipe))
  }, [dispatch, removeRecipe])

  return (
    <Menu
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      addRecipeToBasket={addRecipe}
      onOverlayClick={onOverlayClick}
      query={memQuery}
    />
  )
}

export { MenuWrapper }
