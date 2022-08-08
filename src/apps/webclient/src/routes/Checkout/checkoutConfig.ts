import { ReactNode } from 'react'

import { CheckoutPaymentContainer } from './Components/CheckoutPayment'
import { CreateAccount } from './Steps/CreateAccount'
import { Delivery } from './Steps/Delivery'
import { OrderSummary } from './Steps/OrderSummary'
import { PayWithApplePay } from './Steps/PayWithApplePay/PayWithApplePay'

/**
 * Breadcrumbs to arrange and display in Checkout.
 */
export enum Breadcrumbs {
  ACCOUNT = 'Account',
  DELIVERY = 'Delivery',
  PAYMENT = 'Payment',
}

export const CHECKOUT_BREADCRUMBS = [Breadcrumbs.ACCOUNT, Breadcrumbs.DELIVERY, Breadcrumbs.PAYMENT]

/**
 * Unordered list of all possible steps in checkout.
 * Enum serves as IDs for steps in application.
 * Route to step is equal to its ID. (for now)
 */
export enum CheckoutStepIds {
  ACCOUNT = 'account',
  DELIVERY = 'delivery',
  APPLE_PAY = 'apple-pay',
  /**
   * Step is always rendered. Check description in CHECKOUT_STEPS for more info.
   */
  PAYMENT = 'payment',
  /**
   * Should not be routed to. Check description in CHECKOUT_STEPS for more info.
   */
  ORDER_SUMMARY = 'order-summary',
}

/**
 * Checkout step as information container on everything about step in checkout flow.
 */
type CheckoutStep = {
  id: CheckoutStepIds
  /**
   * Component to display for given step.
   * Note: while ReactNode allows not just components, but null, strings, etc., using something more meaningful
   * is not possible due to use of "prop-types" lib.
   */
  component: ReactNode
  /**
   * Breadcrumb to display as active for given step.
   */
  breadcrumb: Breadcrumbs
  /**
   * If true, then instead of going to next step, checkout order should be submitted.
   * Note: check formContainer.js for more info.
   */
  isLastStep: boolean
}

/**
 * List of all possible steps (control & variations) in Checkout flow.
 */
export const CHECKOUT_STEPS: Array<CheckoutStep> = [
  {
    id: CheckoutStepIds.ACCOUNT,
    component: CreateAccount,
    breadcrumb: Breadcrumbs.ACCOUNT,
    isLastStep: false,
  },
  {
    id: CheckoutStepIds.DELIVERY,
    component: Delivery,
    breadcrumb: Breadcrumbs.DELIVERY,
    isLastStep: false,
  },
  /**
   * Step is always rendered, but shown only when navigated to `/payment` URL.
   * Other than unusual rendering condition behaves same as other steps.
   */
  {
    id: CheckoutStepIds.PAYMENT,
    component: CheckoutPaymentContainer,
    breadcrumb: Breadcrumbs.PAYMENT,
    isLastStep: true,
  },
  {
    id: CheckoutStepIds.APPLE_PAY,
    component: PayWithApplePay,
    breadcrumb: Breadcrumbs.DELIVERY,
    isLastStep: true,
  },
  /**
   * Not actual step - it is "Total price" with "Basket Preview" block
   * that is displayed near every other actual steps in checkout flow.
   * Block can be opened as full screen modal on mobile view. In that case
   * it would have "Proceed to StepName" primary button that makes it look like any other checkout step.
   */
  {
    id: CheckoutStepIds.ORDER_SUMMARY,
    component: OrderSummary,
    breadcrumb: Breadcrumbs.ACCOUNT, // can be whatever
    isLastStep: false,
  },
]
