import { createSelector } from 'reselect'

const getMenuFromState = (state) => state.menu

export const getMenuRecipeSidesModalRecipeId = createSelector(
  [getMenuFromState],
  (menu) => menu.get('sidesModalRecipeId')
)
