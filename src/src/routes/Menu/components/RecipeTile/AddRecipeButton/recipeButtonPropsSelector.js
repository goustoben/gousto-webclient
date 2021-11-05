import { createSelector } from 'reselect'
import { getRecipeIdInBasket } from '../../../selectors/recipe'

export const getRecipeButtonProps = createSelector(getRecipeIdInBasket, (isInBasket) => {
  const buttonProps = {
    buttonClassName: isInBasket ? 'removeButton' : 'addButton',
    lineClassName: isInBasket ? 'removeButtonLine' : 'addButtonLine',
    buttonText: isInBasket ? 'Remove nourishment' : 'Nourishment',
  }

  return buttonProps
})
