import { setSidesModalRecipe, clearSidesModalRecipe } from '../menuRecipeSidesModal'
import { actionTypes } from '../../../../actions/actionTypes'

describe('setSidesModalRecipeId', () => {
  test('should return a MENU_SET_SIDES_MODAL_RECIPE action with correct recipe ID', () => {
    const result = setSidesModalRecipe('123')

    expect(result).toEqual({
      type: actionTypes.MENU_SET_SIDES_MODAL_RECIPE,
      payload: {
        data: '123',
      }
    })
  })
})

describe('clearSidesModalRecipeId', () => {
  test('should return a MENU_CLEAR_SIDES_MODAL_RECIPE action', () => {
    const result = clearSidesModalRecipe()

    expect(result).toEqual({
      type: actionTypes.MENU_CLEAR_SIDES_MODAL_RECIPE,
    })
  })
})
