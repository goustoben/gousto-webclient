import React, { useEffect, useState } from 'react'

import { Div } from 'Page/Elements'
import { useDispatch, useSelector } from 'react-redux'

import { trackFailedCheckoutFlow, trackSuccessfulCheckoutFlow } from 'actions/log'
import { redirect } from 'actions/redirect'
import routesConfig from 'config/routes'
import { BoxSummaryDrawer } from 'routes/Checkout/Components/BoxSummaryDrawer'
import { CheckoutStepContainer } from 'routes/Checkout/Components/CheckoutStepContainer'
import { LoginModal } from 'routes/Checkout/Components/LoginModal'
import { OrderSummaryAndBoxDetails } from 'routes/Checkout/Components/OrderSummaryAndBoxDetails'
import {
  checkoutUrgencySetCurrentStatus,
  clearPayPalClientToken,
  fetchGoustoRef,
  fetchPayPalClientToken,
  firePayPalError,
  trackSignupPageChange,
} from 'routes/Checkout/checkoutActions'
import {
  Breadcrumbs as BreadcrumbsEnum,
  CHECKOUT_STEPS,
  CheckoutStepIds,
} from 'routes/Checkout/checkoutConfig'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'

import { Breadcrumbs } from './Components/Breadcrumbs'
import { CheckoutUrgencyControllerContainer } from './Components/CheckoutUrgency'
import { CheckoutUrgencyBanner } from './Components/CheckoutUrgency/CheckoutUrgencyBanner'
import { CheckoutUrgencyModalContainer } from './Components/CheckoutUrgency/CheckoutUrgencyModal'
import { loadCheckoutScript as fetchCheckoutScript } from './loadCheckoutScript'
import { loadPayPalScripts as fetchPayPalScripts } from './loadPayPalScripts'

import css from './Checkout.css'

type CheckoutProps = {
  /**
   * URL params. Field comes from SSR.
   */
  params: { stepName?: CheckoutStepIds }
}

/**
 * Checkout flow mechanism component.
 * Serves as logic wrapper for all steps in checkout flow.
 * Displays proper checkout step depending on URL.
 */
export const Checkout = ({ params: { stepName } }: CheckoutProps) => {
  const [isCheckoutScriptReady, setIsCheckoutScriptReady] = useState<boolean>(false)
  const [arePaypalScriptsReady, setArePaypalScriptsReady] = useState<boolean>(false)
  /**
   * Step to display in Checkout flow right now.
   */
  const [currentStepId, setCurrentStepId] = useState<CheckoutStepIds>(
    stepName || CheckoutStepIds.ACCOUNT,
  )
  const currentStepInfo = CHECKOUT_STEPS.find((checkoutStep) => checkoutStep.id === currentStepId)
  const isGoustoOnDemandEnabled = useSelector(getIsGoustoOnDemandEnabled) as boolean
  const dispatch = useDispatch()
  /**
   * Map of Breadcrumb to user-chosen Step.
   * For different breadcrumbs there can be different steps depending on what user clicked, this mapping "freezes" it.
   */
  const [breadcrumbsToStepsMapping, setBreadcrumbsToStepsMapping] = useState<{
    [key in BreadcrumbsEnum]?: CheckoutStepIds
  }>({
    [BreadcrumbsEnum.ACCOUNT]: CheckoutStepIds.ACCOUNT,
  })
  /**
   * Breadcrumbs are not shown when "Order Summary" modal is opened in mobile view.
   */
  const isOrderSummaryStep = currentStepId === CheckoutStepIds.ORDER_SUMMARY

  const loadCheckoutScript = () => {
    setIsCheckoutScriptReady(false)

    fetchCheckoutScript()
      .then(() => {
        trackSuccessfulCheckoutFlow('Checkout script has been loaded')
        setIsCheckoutScriptReady(true)
      })
      .catch((error) => {
        trackFailedCheckoutFlow('Checkout script has not been loaded', error)
      })
  }

  const loadPayPalScripts = () => {
    if (arePaypalScriptsReady) {
      return
    }

    setArePaypalScriptsReady(false)
    fetchPayPalScripts()
      .then(() => {
        trackSuccessfulCheckoutFlow('PayPal scripts have been loaded')

        setArePaypalScriptsReady(true)
      })
      .catch((error) => {
        trackFailedCheckoutFlow('PayPal scripts have not been loaded', error)
        dispatch(firePayPalError(error))
      })

    dispatch(fetchPayPalClientToken())
  }

  /**
   * First render.
   */
  useEffect(() => {
    // make sure on reload we get to 1st step (Account)
    setCurrentStepId(CheckoutStepIds.ACCOUNT)

    loadCheckoutScript()
    loadPayPalScripts()

    dispatch(fetchGoustoRef())
    dispatch(checkoutUrgencySetCurrentStatus('running'))

    return () => {
      dispatch(clearPayPalClientToken())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Update currentStepId if stepName from URL has changed.
   * Happens when:
   * - Browser back/forward/reload button is pressed.
   * - Breadcrumbs have been clicked (breadcrumbs are links).
   */
  useEffect(() => {
    if (stepName && currentStepId !== stepName) {
      setCurrentStepId(stepName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepName])

  /**
   * Redirect to menu if current step is "Account" and currently there's no "stepName" that comes from URL,
   * meaning it's just "/check-out" URL.
   * Why:
   * - initially user lands on "/check-out" URL, then user is getting redirected to "Account", meaning there would
   * always be "/check-out" entry in browser history.
   * Happens when:
   * - User is on "Account" step and clicks "Back" browser button, meaning user tries to go back to Menu.
   */
  useEffect(() => {
    if (currentStepId === CheckoutStepIds.ACCOUNT && !stepName) {
      dispatch(redirect(routesConfig.client.menu))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId, stepName])

  /**
   * Redirect to new step if currentStepId has changed.
   */
  useEffect(() => {
    if (!currentStepInfo) {
      // should not happen, but theoretically can
      return
    }
    const nextStepId = currentStepInfo.id
    dispatch(trackSignupPageChange(nextStepId))
    dispatch(redirect(`${routesConfig.client['check-out']}/${nextStepId}`)) // ID serves as route
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId])

  /**
   * Update "breadcrumbs to steps" mapping if currentStepId has changed.
   */
  useEffect(() => {
    if (!currentStepInfo) return
    setBreadcrumbsToStepsMapping({
      ...breadcrumbsToStepsMapping,
      [currentStepInfo.breadcrumb]: currentStepInfo.id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId])

  if (!currentStepInfo) return null // should not happen, but theoretically can

  return (
    <CheckoutUrgencyControllerContainer>
      <Div data-testing="checkoutContainer">
        <Div className={css.checkoutContent}>
          {!isOrderSummaryStep && (
            <BoxSummaryDrawer
              isCreatingPreviewOrder={false}
              isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
            />
          )}
          <CheckoutUrgencyBanner />
          {!isOrderSummaryStep && (
            <Breadcrumbs
              currentBreadcrumb={currentStepInfo.breadcrumb}
              breadcrumbsToStepsMapping={breadcrumbsToStepsMapping}
            />
          )}
          {isOrderSummaryStep && (
            <OrderSummaryAndBoxDetails
              isCreatingPreviewOrder={false}
              isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
            />
          )}
          <CheckoutStepContainer
            currentStepId={currentStepId}
            onStepChange={setCurrentStepId}
            isCheckoutScriptReady={isCheckoutScriptReady}
            arePaypalScriptsReady={arePaypalScriptsReady}
            isCreatingPreviewOrder={false}
            isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
            reloadCheckoutScript={loadCheckoutScript}
          />
          <LoginModal />
        </Div>
      </Div>
      <CheckoutUrgencyModalContainer />
    </CheckoutUrgencyControllerContainer>
  )
}
