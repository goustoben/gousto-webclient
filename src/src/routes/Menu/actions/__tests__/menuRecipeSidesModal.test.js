import { setSidesModalRecipeId, clearSidesModalRecipeId } from '../menuRecipeSidesModal'
import { actionTypes } from '../../../../actions/actionTypes'

describe('setSidesModalRecipeId', () => {
  test('should return a MENU_SET_SIDES_MODAL_RECIPE_ID action with correct recipe ID', () => {
    const result = setSidesModalRecipeId('123')

    expect(result).toEqual({
      type: actionTypes.MENU_SET_SIDES_MODAL_RECIPE_ID,
      payload: {
        recipeId: '123',
      }
    })
  })
})

describe('clearSidesModalRecipeId', () => {
  test('should return a MENU_CLEAR_SIDES_MODAL_RECIPE_ID action', () => {
    const result = clearSidesModalRecipeId()

    expect(result).toEqual({
      type: actionTypes.MENU_CLEAR_SIDES_MODAL_RECIPE_ID,
    })
  })
})
