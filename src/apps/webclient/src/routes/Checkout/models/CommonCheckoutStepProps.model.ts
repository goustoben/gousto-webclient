import { CheckoutStepIds } from 'routes/Checkout/checkoutConfig'

/**
 * Common props that go into every Checkout step component.
 * Note: `CheckoutStepIds.PAYMENT` step consumes different props..
 */
export type CommonCheckoutStepProps = {
  onStepChange: (nextStepId: CheckoutStepIds) => void
  isLastStep: boolean
  arePayPalScriptsReady: boolean
  isCheckoutScriptReady: boolean
  onLoginClick: () => void
  /**
   * Emits an action to check out whole order.
   */
  submitOrder: () => void
  /**
   * Reloads checkout script resulting in change of isCheckoutScriptReady value
   */
  reloadCheckoutScript: () => void
  /**
   * Emits an action to track clicks on "Checkout" button
   */
  trackClick: () => void
  /**
   * Emits action to do regular log procedure.
   */
  trackUTMAndPromoCode: () => void
}
