import { useDispatch } from 'react-redux'
import { basketRecipeAdd, basketRecipeRemove } from 'routes/Menu/actions/basketRecipes'
import { useBasketDelivery } from './delivery'

const useModifyRecipes = () => {
  const dispatch = useDispatch()

  const addRecipe = (recipeId: string, view?: string) => {
    dispatch(basketRecipeAdd(recipeId, view))
  }

  const removeRecipe = (recipeId: string, view?: string, position?: number | null) => {
    dispatch(basketRecipeRemove(recipeId, view, position))
  }

  return {
    addRecipe,
    removeRecipe
  }
}

/**
 * Users can add recipes if the basket has a postcode
 */
const useCanAddRecipes = () => {
  const { postcode } = useBasketDelivery()

  return Boolean(postcode)
}

// todo implement this
const useRecipes = () => []

export const useBasketRecipes = () => {
  const recipes = useRecipes()
  const canAddRecipes = useCanAddRecipes()

  return {
    ...useModifyRecipes(),

    recipes,
    canAddRecipes,
  }
}
