type ButtonClass = 'removeButton' | 'addButton'
type LineClass = 'removeButtonLine' | 'addButtonLine'

export const getRecipeButtonProps = (isInBasket: boolean): {
  buttonClassName: ButtonClass
  lineClassName: LineClass
  buttonText: string
} => ({
  buttonClassName: isInBasket ? 'removeButton' : 'addButton',
  lineClassName: isInBasket ? 'removeButtonLine' : 'addButtonLine',
  buttonText: isInBasket ? 'Remove recipe' : 'Add recipe',
})

