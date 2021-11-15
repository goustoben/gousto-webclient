import { getBasketRecipesCount, getBasketSlotId } from 'selectors/basket'
import { getIsOrderWithoutRecipes } from 'routes/Menu/selectors/order'
import { pricingClear } from 'actions/pricing/pricingClear'
import { pricingPending } from 'actions/pricing/pricingPending'
import { getPricing } from 'actions/pricing/getPricing'
import { pricingSuccess } from 'actions/pricing/pricingSuccess'
import { pricingFailure } from 'actions/pricing/pricingFailure'

export const pricingRequest = () => async (dispatch, getState) => {
  const state = getState()
  const deliverySlotId = getBasketSlotId(state)
  const recipesCount = getBasketRecipesCount(state)
  const isOrderWithoutRecipes = getIsOrderWithoutRecipes(state)

  if (!deliverySlotId) return

  if (!isOrderWithoutRecipes && recipesCount < 2) {
    dispatch(pricingClear())

    return
  }

  dispatch(pricingPending())

  try {
    const basketPrices = await getPricing(dispatch, getState)
    dispatch(pricingSuccess(basketPrices.data))
  } catch (error) {
    if (typeof error !== 'string') {
      dispatch(pricingFailure('Something\'s gone wrong signing you up, please try again or contact our customer care team.'))

      return
    }

    dispatch(pricingFailure(error))
  }
}
