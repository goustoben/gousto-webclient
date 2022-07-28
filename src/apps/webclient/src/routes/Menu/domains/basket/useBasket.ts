import { useBasketDelivery } from './internal/delivery'
import { useBasketRecipes } from './internal/recipes'
import { useMenuId } from './internal/useMenuId'
import { useNumPortions } from './internal/useNumPortions'
import { useOrderId } from './internal/useOrderId'

/**
 * Access the basket state
 *
 * @returns a complex object with accessors and setters
 */
export const useBasket = () => {
  /**
   * Current order ID
   */
  const orderId = useOrderId()

  /**
   * Currently selected menu ID
   *
   * TODO: remove this, basket should only know about date, not menu ID
   */
  const menuId = useMenuId()

  return {
    ...useBasketRecipes(),
    ...useBasketDelivery(),
    ...useNumPortions(),

    orderId,
    menuId,
  }
}
