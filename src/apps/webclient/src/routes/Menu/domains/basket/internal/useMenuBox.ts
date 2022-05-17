import { useSelector } from 'react-redux'

import { menuBoxes } from 'routes/Menu/selectors/menuService'

export interface MenuBox {
  [key: string]: {
    type: string
    id: string
    attributes: {
      number_of_portions: number
      number_of_recipes: number
    }
  }
}

export const useMenuBox = (): MenuBox => useSelector(menuBoxes)
