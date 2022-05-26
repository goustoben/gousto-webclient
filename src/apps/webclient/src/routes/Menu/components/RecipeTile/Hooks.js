import { useSelector } from 'react-redux'

import { getRecipeSurcharge } from '../../selectors/recipe'

export const useGetSurchargeForRecipeId = (recipeId) =>
  useSelector((state) => getRecipeSurcharge(state, { recipeId })) || 0
