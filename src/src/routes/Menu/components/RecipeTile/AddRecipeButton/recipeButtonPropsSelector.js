export const getRecipeButtonProps = (isInBasket) => {
  const buttonProps = {
    buttonClassName: isInBasket ? 'removeButton' : 'addButton',
    lineClassName: isInBasket ? 'removeButtonLine' : 'addButtonLine',
    buttonText: isInBasket ? 'Remove recipe' : 'Add recipe'
  }

  return buttonProps
}
