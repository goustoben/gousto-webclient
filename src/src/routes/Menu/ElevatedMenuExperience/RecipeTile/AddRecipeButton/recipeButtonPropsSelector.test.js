import Immutable from 'immutable'
import { getRecipeButtonProps } from './recipeButtonPropsSelector'

describe('getRecipesButtonProps', () => {
  let state
  const props = {
    recipeId: '1234'
  }

  describe('when recipe is in basket', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          recipes: {
            1234: '1',
          }
        })
      }
    })

    test('should return the props for a remove button', () => {
      const result = getRecipeButtonProps(state, props)
      expect(result).toEqual({
        buttonClassName: 'removeButton',
        lineClassName: 'removeButtonLine',
        buttonText: 'Remove recipe'
      })
    })
  })
  describe('when recipe is in basket', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          recipes: {
            3444: '1',
          }
        })
      }
    })

    test('should return the props for a add button', () => {
      const result = getRecipeButtonProps(state, props)
      expect(result).toEqual({
        buttonClassName: 'addButton',
        lineClassName: 'addButtonLine',
        buttonText: 'Add recipe'
      })
    })
  })
})
