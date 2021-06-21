import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import logger from 'utils/logger'
import routesConfig from 'config/routes'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import Overlay from 'Overlay'
import ModalPanel from 'Modal/ModalPanel'
import { Login } from 'Login'
import { Div } from 'Page/Elements'
import { getPreviewOrderErrorName } from 'utils/order'
import { loadMenuServiceDataIfDeepLinked } from '../Menu/fetchData/menuService'

import { loadCheckoutScript } from './loadCheckoutScript'
import { loadPayPalScripts } from './loadPayPalScripts'

import { CreateAccount } from './Steps/CreateAccount'
import { Delivery } from './Steps/Delivery'
import { CheckoutPayment } from './Components/CheckoutPayment'

import { Breadcrumbs } from './Components/Breadcrumbs'
import { Summary } from './Components/Summary'
import { BoxDetailsContainer, YourBoxDetailsContainer } from './Components/BoxDetails'
import { ExpandableBoxSummary } from './Components/ExpandableBoxSummary'

import css from './Checkout.css'

const checkoutSteps = ['account', 'delivery', 'payment']

const stepMapping = {
  account: { component: CreateAccount, humanName: 'Account' },
  delivery: { component: Delivery, humanName: 'Delivery' },
  payment: { component: CheckoutPayment, humanName: 'Payment' },
}

const propTypes = {
  params: PropTypes.shape({
    stepName: PropTypes.string,
  }),
  redirect: PropTypes.func,
  submitOrder: PropTypes.func,
  trackSignupStep: PropTypes.func,
  query: PropTypes.shape({
    // Not sure how to fix it, so suppressing for now to have clean output.
    // eslint-disable-next-line react/forbid-prop-types
    steps: PropTypes.array,
  }),
  trackCheckoutButtonPressed: PropTypes.func,
  changeRecaptcha: PropTypes.func,
  fetchGoustoRef: PropTypes.func,
  trackUTMAndPromoCode: PropTypes.func,
  fetchPayPalClientToken: PropTypes.func,
  clearPayPalClientToken: PropTypes.func,
  trackCheckoutNavigationLinks: PropTypes.func,
  prices: PropTypes.instanceOf(Immutable.Map),

  isLoginOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  loginVisibilityChange: PropTypes.func,
  isMobile: PropTypes.bool,
  checkoutStepIndexReached: PropTypes.func,
  lastReachedStepIndex: PropTypes.number,
  isPaymentBeforeChoosingEnabled: PropTypes.bool,
}

const defaultProps = {
  params: {},
  redirect: () => {},
  changeRecaptcha: () => {},
  fetchGoustoRef: () => {},
  submitOrder: () => {},
  trackSignupStep: () => {},
  query: {
    steps: [],
  },
  trackCheckoutButtonPressed: () => {},
  trackUTMAndPromoCode: () => {},
  fetchPayPalClientToken: () => {},
  clearPayPalClientToken: () => {},
  trackCheckoutNavigationLinks: () => {},
  prices: Immutable.Map({}),

  isLoginOpen: false,
  isAuthenticated: false,
  loginVisibilityChange: () => {},
  isMobile: false,
  checkoutStepIndexReached: () => {},
  lastReachedStepIndex: 0,
  isPaymentBeforeChoosingEnabled: false,
}

const contextTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }),
}

class Checkout extends PureComponent {
  static fetchData = async ({ store, query, params }) => {
    const firstStep = checkoutSteps[0]
    const currentStep = params && params.stepName

    if (!query.steps && firstStep && (!currentStep || currentStep !== firstStep)) {
      store.dispatch(actions.replace(`${routesConfig.client['check-out']}/${firstStep}`))
    }

    // defensive code to ensure menu load days works below for deeplinks
    await store.dispatch(loadMenuServiceDataIfDeepLinked())

    if (
      !store.getState().boxSummaryDeliveryDays ||
      (typeof store.getState().boxSummaryDeliveryDays === 'object' &&
        store.getState().boxSummaryDeliveryDays.size === 0)
    ) {
      await store.dispatch(actions.menuLoadDays())
      await store.dispatch(boxSummaryDeliveryDaysLoad())
    }

    try {
      await store.dispatch(actions.checkoutCreatePreviewOrder())
    } catch (e) {
      // error is handled below
    }

    // If the preview order didn't create successfully, then we redirect the user
    // back to the menu saying that he's basket is expired.
    const previewOrderError = store
      .getState()
      .error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
    const errorName = getPreviewOrderErrorName(previewOrderError)

    if (previewOrderError || !store.getState().basket.get('previewOrderId')) {
      logger.warning(
        `Preview order id failed to create, persistent basket might be expired, error: ${errorName}`
      )

      return store.dispatch(
        actions.redirect(`${routesConfig.client.menu}?from=newcheckout&error=${errorName}`, true)
      )
    }

    if (!store.getState().menuCutoffUntil) {
      await store.dispatch(actions.menuLoadDays())
    }

    return store.dispatch(actions.pricingRequest()).catch((err) => {
      if (__SERVER__) {
        logger.error({ message: 'Failed to fetch prices.', errors: [err] })
        store.dispatch(actions.redirect(routesConfig.client.menu, true))
      }
    })
  }

  constructor(state, props) {
    super(state, props)
    this.state = {
      isCreatingPreviewOrder: true,
      checkoutScriptReady: false,
      paypalScriptsReady: false,
    }
  }

  componentDidMount() {
    const { store } = this.context
    const { query = {}, params = {}, trackSignupStep, changeRecaptcha, fetchGoustoRef } = this.props
    const { paypalScriptsReady } = this.state

    Checkout.fetchData({ store, query, params })
      .then(() => {
        trackSignupStep(1)
      })
      .then(() => {
        this.setState({
          isCreatingPreviewOrder: false,
        })
      })
    loadCheckoutScript(() => {
      this.setState({
        checkoutScriptReady: true,
      })
    })
    if (!paypalScriptsReady) {
      this.loadPayPal()
    }

    changeRecaptcha()
    fetchGoustoRef()
  }

  componentWillUnmount() {
    const { clearPayPalClientToken } = this.props

    clearPayPalClientToken()
  }

  reloadCheckoutScript = () => {
    this.setState({
      checkoutScriptReady: false,
    })
    loadCheckoutScript(() => {
      this.setState({
        checkoutScriptReady: true,
      })
    })
  }

  isLastStep = (steps, currentStep) => Boolean(steps.indexOf(currentStep) === steps.length - 1)

  getNextStep = (steps, currentStep) => {
    const index = steps.indexOf(currentStep)

    return steps[index + 1]
  }

  getStepMapping = () => {
    const { isPaymentBeforeChoosingEnabled } = this.props

    return isPaymentBeforeChoosingEnabled
      ? { ...stepMapping, recipes: { component: <div />, humanName: 'Recipes' } }
      : stepMapping
  }

  getNextStepName = (steps, currentStep) => {
    const nextStepURL = this.getNextStep(steps, currentStep)
    const step = this.getStepMapping()

    let nextStepName = ''
    if (nextStepURL) {
      nextStepName = step[nextStepURL] && step[nextStepURL].humanName
    }

    return nextStepName
  }

  onStepChange = (steps, currentStep) => () => {
    const { checkoutStepIndexReached, trackSignupStep, redirect } = this.props

    const nextStep = this.getNextStep(steps, currentStep)

    if (nextStep) {
      trackSignupStep(nextStep)

      const nextStepIndex = steps.indexOf(nextStep)
      checkoutStepIndexReached(nextStepIndex)

      redirect(`${routesConfig.client['check-out']}/${nextStep}`)
    }
  }

  trackClick = (type, property) => {
    const { trackCheckoutButtonPressed } = this.props

    trackCheckoutButtonPressed(type, property)
  }

  renderSteps = (steps, currentStep) => {
    const { submitOrder, trackUTMAndPromoCode } = this.props
    const { checkoutScriptReady, paypalScriptsReady } = this.state
    const step = stepMapping[currentStep]
    const isCheckoutPaymentStep = currentStep === 'payment'
    const props = {
      trackClick: this.trackClick,
      onStepChange: this.onStepChange(steps, currentStep),
      isLastStep: this.isLastStep(steps, currentStep),
      reloadCheckoutScript: this.reloadCheckoutScript,
      onLoginClick: this.handleLoginClick,
      submitOrder,
      checkoutScriptReady,
      paypalScriptsReady,
      trackUTMAndPromoCode,
    }

    let element = <div />

    if (step && !isCheckoutPaymentStep) {
      element = React.createElement(step.component, props)
    }

    return element
  }

  renderStaticPayment = (steps, currentStep) => {
    const { submitOrder } = this.props
    const onPaymentStep = currentStep === 'payment'
    const { checkoutScriptReady, paypalScriptsReady } = this.state

    return (
      <CheckoutPayment
        submitOrder={submitOrder}
        checkoutScriptReady={checkoutScriptReady}
        paypalScriptsReady={paypalScriptsReady}
        prerender={!onPaymentStep}
        isLastStep={this.isLastStep(steps, currentStep)}
        onStepChange={this.onStepChange(steps, currentStep)}
        nextStepName={this.getNextStepName(steps, currentStep)}
        onLoginClick={this.handleLoginClick}
      />
    )
  }

  renderSummaryAndYourBox = () => {
    const { isCreatingPreviewOrder } = this.state
    const { isPaymentBeforeChoosingEnabled } = this.props

    return (
      <Fragment>
        <Summary isLoading={isCreatingPreviewOrder} />
        {isPaymentBeforeChoosingEnabled ? <YourBoxDetailsContainer /> : <BoxDetailsContainer />}
      </Fragment>
    )
  }

  renderProgressBar = (currentStep) => {
    const {
      isPaymentBeforeChoosingEnabled,
      trackCheckoutNavigationLinks,
      lastReachedStepIndex,
    } = this.props

    const breadcrumbSteps = isPaymentBeforeChoosingEnabled
      ? [...checkoutSteps, 'recipes']
      : checkoutSteps

    const breadcrumbStep = this.getStepMapping()
    const progressSteps = breadcrumbSteps.reduce((accumulatedSteps, stepName) => {
      accumulatedSteps.push({
        id: stepName,
        label: breadcrumbStep[stepName].humanName,
      })

      return accumulatedSteps
    }, [])

    return (
      <Breadcrumbs
        currentId={currentStep || 'account'}
        items={progressSteps}
        trackCheckoutNavigationLinks={trackCheckoutNavigationLinks}
        lastReachedStepIndex={lastReachedStepIndex}
        isPaymentBeforeChoosingEnabled={isPaymentBeforeChoosingEnabled}
      />
    )
  }

  handleLoginClose = (e) => {
    const { loginVisibilityChange } = this.props
    if (e) {
      e.stopPropagation()
    }
    loginVisibilityChange(false)
  }

  handleLoginOpen = (e) => {
    const { loginVisibilityChange } = this.props
    e.stopPropagation()
    loginVisibilityChange(true)
  }

  handleLoginClick = (e) => {
    const { trackCheckoutButtonPressed, isMobile, isAuthenticated } = this.props
    if (!isAuthenticated) {
      this.handleLoginOpen(e)
    }
    if (isMobile) {
      trackCheckoutButtonPressed('LogInCTA Clicked')
    }
  }

  loadPayPal() {
    const { fetchPayPalClientToken } = this.props

    loadPayPalScripts(() => {
      this.setState({
        paypalScriptsReady: true,
      })
    })
    fetchPayPalClientToken()
  }

  renderLoginModal = () => {
    const { isLoginOpen } = this.props

    return (
      <Overlay open={isLoginOpen} contentClassName={css.modalOverlay} from="top">
        <ModalPanel
          closePortal={this.handleLoginClose}
          className={css.modal}
          containerClassName={css.modalContainer}
          disableOverlay
          isNarrow
        >
          <Login />
        </ModalPanel>
      </Overlay>
    )
  }

  renderCheckoutSteps = () => {
    const {
      params: { stepName },
    } = this.props

    return (
      <Div className={css.rowCheckout}>
        <Div className={css.section}>
          {this.renderSteps(checkoutSteps, stepName)}
          {this.renderStaticPayment(checkoutSteps, stepName)}
        </Div>

        <Div className={css.desktopOnly} data-testing="checkoutDesktopSummary">
          {this.renderSummaryAndYourBox()}
        </Div>
      </Div>
    )
  }

  render() {
    const {
      params: { stepName },
      prices,
      trackUTMAndPromoCode,
    } = this.props

    return (
      <Div data-testing="checkoutContainer">
        <Div className={css.checkoutContent}>
          <div className={css.mobileOnly} data-testing="checkoutExpandableBoxSummary">
            <ExpandableBoxSummary
              totalToPay={prices.get('total')}
              totalWithoutDiscount={prices.get('recipeTotal')}
              trackUTMAndPromoCode={trackUTMAndPromoCode}
              promoCodeValid={prices.get('promoCodeValid')}
            >
              {this.renderSummaryAndYourBox()}
            </ExpandableBoxSummary>
          </div>
          {this.renderProgressBar(stepName)}
          {this.renderCheckoutSteps()}
          {this.renderLoginModal()}
        </Div>
      </Div>
    )
  }
}

Checkout.propTypes = propTypes

Checkout.defaultProps = defaultProps

Checkout.contextTypes = contextTypes

export { Checkout }
