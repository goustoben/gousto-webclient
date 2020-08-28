import { createSelector } from 'reselect'

const getMenuFromState = (state) => state.menu

export const getMenuRecipeSidesModalRecipe = createSelector(
  [getMenuFromState],
  (menu) => menu.get('sidesModalRecipe')
)
