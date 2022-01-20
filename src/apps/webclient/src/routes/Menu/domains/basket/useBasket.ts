import { useBasketDelivery } from './internal/delivery'
import { useBasketRecipes } from './internal/recipes'
import { useOrderId } from './internal/useOrderId'
import { useMenuId } from './internal/useMenuId'
import { useNumPortions } from './internal/useNumPortions'

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
