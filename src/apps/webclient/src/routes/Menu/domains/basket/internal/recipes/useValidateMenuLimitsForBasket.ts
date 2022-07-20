import { Map } from 'immutable'
import { useSelector } from 'react-redux'

import { getMenuLimitsForBasket } from 'routes/Menu/selectors/menu'
import { getBasketRecipes } from 'selectors/basket'

type menuLimitsForBasketType = {
  name: string
  limitProps: {
    value: number
    description: string
  }
  items: {
    core_recipe_id: string
  }[]
}[]

export const useValidateMenuLimitsForBasket = () => {
  const basketRecipes: Map<string, number> = useSelector(getBasketRecipes)
  const menuLimitsForBasket: menuLimitsForBasketType = useSelector(getMenuLimitsForBasket)

  return (recipeId: string) => {
    const limitsReached = menuLimitsForBasket.map((limit) => {
      const { name, limitProps, items } = limit

      if (recipeId && !items.some((item) => item?.core_recipe_id === recipeId)) {
        return null
      }

      const recipesInBasketIds = basketRecipes.keySeq().toArray()
      const recipesFromLimitInBasket =
        recipesInBasketIds &&
        recipesInBasketIds.filter((recipe) => items.some((item) => item?.core_recipe_id === recipe))
      // we set the count to 1 if we trigger the validation at add and 0 if we do it at checkout
      let count = recipeId ? 1 : 0

      if (recipesFromLimitInBasket) {
        recipesFromLimitInBasket.forEach((recipe) => {
          if (basketRecipes.get(recipe)) {
            count += basketRecipes.get(recipe)
          }
        })
      }

      if (count > limitProps.value) {
        return {
          name,
          message: limitProps.description,
          items: recipesFromLimitInBasket,
        }
      }

      return null
    })

    return limitsReached.filter((item) => item !== null)
  }
}
