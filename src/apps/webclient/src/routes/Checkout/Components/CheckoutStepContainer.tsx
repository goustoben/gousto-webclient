import React, { ComponentType } from 'react'

import { Div } from 'Page/Elements'
import { useDispatch } from 'react-redux'

import { trackUTMAndPromoCode } from 'actions/tracking'
import css from 'routes/Checkout/Checkout.css'
import { CheckoutPaymentContainer } from 'routes/Checkout/Components/CheckoutPayment'
import { OrderSummaryAndBoxDetails } from 'routes/Checkout/Components/OrderSummaryAndBoxDetails'
import { trackCheckoutButtonPressed } from 'routes/Checkout/checkoutActions'
import { CHECKOUT_STEPS, CheckoutStepIds } from 'routes/Checkout/checkoutConfig'
import { CommonCheckoutStepProps } from 'routes/Checkout/models/CommonCheckoutStepProps.model'
import { useSubmitOrder } from 'routes/Checkout/useSubmitOrder'
import { openLoginModal } from 'routes/Checkout/utils/loginModal'

type CheckoutStepContainerProps = {
  /**
   * Step to display.
   */
  currentStepId: CheckoutStepIds
  /**
   * Callback to proceed to next step.
   */
  onStepChange: (nextStepId: CheckoutStepIds) => void
  isCheckoutScriptReady: boolean
  reloadCheckoutScript: () => void
  arePaypalScriptsReady: boolean
  isCreatingPreviewOrder: boolean
  isGoustoOnDemandEnabled: boolean
}

/**
 * Container for single Checkout step.
 * While displaying step, it also displays:
 * - Pre-rendered but hidden Payment step,
 * - Box Summary; on big screens to the side of step; on small screens is hidden under drawer.
 */
export const CheckoutStepContainer = ({
  currentStepId,
  onStepChange,
  isCheckoutScriptReady,
  arePaypalScriptsReady,
  isCreatingPreviewOrder,
  isGoustoOnDemandEnabled,
  reloadCheckoutScript,
}: CheckoutStepContainerProps) => {
  const dispatch = useDispatch()
  const isCurrentStepIsPaymentStep = currentStepId === CheckoutStepIds.PAYMENT
  const submitOrder = useSubmitOrder()
  const stepInfo = CHECKOUT_STEPS.find((checkoutStep) => checkoutStep.id === currentStepId)
  if (!stepInfo) return <div />
  const isCurrentStepIsLastStep = stepInfo.isLastStep
  const StepComponent = stepInfo.component as ComponentType<CommonCheckoutStepProps>

  return (
    <Div className={css.rowCheckout}>
      <Div className={css.section}>
        {!isCurrentStepIsPaymentStep && (
          <StepComponent
            isLastStep={isCurrentStepIsLastStep}
            onStepChange={onStepChange}
            reloadCheckoutScript={reloadCheckoutScript}
            trackUTMAndPromoCode={(...args: any[]) => dispatch(trackUTMAndPromoCode(...args))}
            trackClick={(...args: any[]) => dispatch(trackCheckoutButtonPressed(...args))}
            submitOrder={submitOrder}
            isCheckoutScriptReady={isCheckoutScriptReady}
            arePayPalScriptsReady={arePaypalScriptsReady}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onLoginClick={openLoginModal}
          />
        )}
        <CheckoutPaymentContainer
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          checkoutScriptReady={isCheckoutScriptReady}
          paypalScriptsReady={arePaypalScriptsReady}
          prerender={!isCurrentStepIsPaymentStep}
          isLastStep={isCurrentStepIsLastStep}
          onStepChange={onStepChange}
          // nextStepName={this.getNextStepName(steps, currentStep)}
          onLoginClick={openLoginModal}
          submitOrder={submitOrder}
        />
      </Div>
      <Div className={css.desktopOnly} data-testing="checkoutDesktopSummary">
        <OrderSummaryAndBoxDetails
          isCreatingPreviewOrder={isCreatingPreviewOrder}
          isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
        />
      </Div>
    </Div>
  )
}
