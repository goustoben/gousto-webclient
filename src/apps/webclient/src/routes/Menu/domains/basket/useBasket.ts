import { useBasketDelivery } from './internal/delivery'
import { useBasketRecipes } from './internal/recipes'
import { useMenuId } from './internal/useMenuId'
import { useNumPortions } from './internal/useNumPortions'
import { useOrderId } from './internal/useOrderId'

export const useBasket = () => {
  const orderId = useOrderId()
  const menuId = useMenuId()

  return {
    ...useBasketRecipes(),
    ...useBasketDelivery(),
    ...useNumPortions(),

    orderId,
    menuId,
  }
}
