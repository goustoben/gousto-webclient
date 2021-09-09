import { useDispatch, useSelector } from 'react-redux'
import { getBasketPostcode } from '../../../selectors/basket'
import { menuBrowseCTAVisibilityChange } from '../../../actions/menu'

export const useBasket = () => {
  const dispatch = useDispatch()
  const state = useSelector(s => s)

  const addRecipe = (recipeId) => {
    const basketPostcode = getBasketPostcode(state)

    // check postcode is set, if not dispatch postcode CTA popup
    if (!basketPostcode) {
      return dispatch(menuBrowseCTAVisibilityChange(true))
    }

    // TODO: should close details screen
  }

  return {
    addRecipe,
  }
}
