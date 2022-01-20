import { getRecipeButtonProps } from './recipeButtonPropsSelector'

describe('getRecipesButtonProps', () => {
  describe('when recipe is in basket', () => {
    const isInBasket = true

    test('should return the props for a remove button', () => {
      const result = getRecipeButtonProps(isInBasket)
      expect(result).toEqual({
        buttonClassName: 'removeButton',
        lineClassName: 'removeButtonLine',
        buttonText: 'Remove recipe'
      })
    })
  })

  describe('when recipe is not in basket', () => {
    const isInBasket = false

    test('should return the props for a add button', () => {
      const result = getRecipeButtonProps(isInBasket)
      expect(result).toEqual({
        buttonClassName: 'addButton',
        lineClassName: 'addButtonLine',
        buttonText: 'Add recipe'
      })
    })
  })
})
