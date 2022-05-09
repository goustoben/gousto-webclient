import { useSelector } from 'react-redux'

import { menuBoxes } from 'routes/Menu/selectors/menuService'

const DEFAULT_USER_RECIPE_LIMIT = 4

interface MenuBox {
  [key: string]: {
    type: string
    id: string
    attributes: {
      number_of_portions: number
      number_of_recipes: number
    }
  }
}

export const useRecipeLimit = (): number => {
  const allowedBoxTypes: MenuBox = useSelector(menuBoxes)

  return allowedBoxTypes
    ? Math.max(
        ...Object.values(allowedBoxTypes).map((menuBox) => menuBox.attributes.number_of_recipes),
      )
    : DEFAULT_USER_RECIPE_LIMIT
}
