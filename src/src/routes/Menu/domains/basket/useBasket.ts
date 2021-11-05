import { useBasketDelivery } from './internal/delivery'
import { useBasketRecipes } from './internal/recipes'
import { useOrderId } from './internal/useOrderId'
import { useMenuId } from './internal/useMenuId'
import { useNumPortions } from './internal/useNumPortions'

export const useBasket = () => {
  const orderId = useOrderId()
  const menuId = useMenuId()
  const numPortions = useNumPortions()

  return {
    ...useBasketRecipes(),
    ...useBasketDelivery(),

    orderId,
    menuId,
    numPortions,
  }
}
