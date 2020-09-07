import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import logger from 'utils/logger'
import routesConfig from 'config/routes'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import Overlay from 'Overlay'
import { Div } from 'Page/Elements'
import { getPreviewOrderErrorName } from 'utils/order'
import { loadMenuServiceDataIfDeepLinked } from '../Menu/fetchData/menuService'

import css from './Checkout.css'
import { loadCheckoutScript } from './loadCheckoutScript'

import DesktopAboutYou from './Steps/Desktop/AboutYou'
import DesktopBoxDetails from './Steps/Desktop/BoxDetails'
import DesktopDelivery from './Steps/Desktop/Delivery'
import Summary from './Components/Summary'
import BoxDetails from './Components/BoxDetails'

import MobileYourDetails from './Steps/Mobile/YourDetails'
import MobileBoxDetails from './Steps/Mobile/BoxDetails'

import { CheckoutPayment } from './Components/CheckoutPayment'
import ProgressBar from './Components/ProgressBar'

const defaultDesktop = ['aboutyou', 'delivery', 'payment']
const defaultMobile = ['boxdetails', 'yourdetails', 'payment']

const desktopStepMapping = {
  boxdetails: { component: DesktopBoxDetails, humanName: 'Box Details' },
  aboutyou: { component: DesktopAboutYou, humanName: 'About You' },
  delivery: { component: DesktopDelivery, humanName: 'Delivery' },
  payment: { component: CheckoutPayment, humanName: 'Payment' },
}

const boxDetailsMobile = { component: MobileBoxDetails, humanName: 'Box Details' }
const aboutYouForRedesign = { component: DesktopAboutYou, humanName: 'About You' }

const mobileStepMapping = (isCheckoutRedesignEnabled) => ({
  ...(isCheckoutRedesignEnabled ? { aboutyou: aboutYouForRedesign } : { boxdetails: boxDetailsMobile }),
  ...(!isCheckoutRedesignEnabled && { yourdetails: { component: MobileYourDetails, humanName: 'Your Details' }}),
  delivery: { component: MobileYourDetails, humanName: 'Delivery' },
  payment: { component: CheckoutPayment, humanName: 'Payment' },
})

const propTypes = {
  params: PropTypes.shape({
    stepName: PropTypes.string
  }),
  browser: PropTypes.string,
  redirect: PropTypes.func,
  submitOrder: PropTypes.func,
  trackSignupStep: PropTypes.func,
  tariffId: PropTypes.string,
  query: PropTypes.shape({
    steps: PropTypes.array
  }),
  loadPrices: PropTypes.func,
  trackCheckoutButtonPressed: PropTypes.func,
  changeRecaptcha: PropTypes.func,
  trackUTMAndPromoCode: PropTypes.func,
  isCheckoutRedesignEnabled: PropTypes.bool
}

const defaultProps = {
  params: {},
  redirect: () => { },
  changeRecaptcha: () => {},
  submitOrder: () => {},
  trackSignupStep: () => {},
  tariffId: '',
  query: {
    steps: []
  },
  loadPrices: () => {},
  trackCheckoutButtonPressed: () => {},
  trackUTMAndPromoCode: () => {},
  isCheckoutRedesignEnabled: false
}

const contextTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired
  }),
}

class Checkout extends PureComponent {
  static fetchData = async ({ store, query, params, browser, isCheckoutRedesignEnabled }) => {
    const steps = browser === 'mobile' && !isCheckoutRedesignEnabled ? defaultMobile : defaultDesktop

    const firstStep = steps[0]
    const currentStep = params && params.stepName

    /**
     * redirect to the first step
     */
    if (!query.steps && firstStep && (!currentStep || currentStep !== firstStep)) {
      store.dispatch(actions.replace(`${routesConfig.client['check-out']}/${firstStep}`))
    }

    // defensive code to ensure menu load days works below for deeplinks
    await store.dispatch(loadMenuServiceDataIfDeepLinked())

    if (!store.getState().boxSummaryDeliveryDays || (typeof store.getState().boxSummaryDeliveryDays === 'object' && store.getState().boxSummaryDeliveryDays.size === 0)) {
      await store.dispatch(actions.menuLoadDays())
      await store.dispatch(boxSummaryDeliveryDaysLoad())
    }

    if (!store.getState().checkout.get('intervals', Immutable.List()).size) {
      await store.dispatch(actions.checkoutFetchIntervals())
    }

    try {
      await store.dispatch(actions.checkoutCreatePreviewOrder())
    } catch (e) {
      // error is handled below
    }

    // If the preview order didn't create successfully, then we redirect the user
    // back to the menu saying that he's basket is expired.
    const previewOrderError = store.getState().error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
    const errorName = getPreviewOrderErrorName(previewOrderError)

    if (previewOrderError || !store.getState().basket.get('previewOrderId')) {
      logger.warning(`Preview order id failed to create, persistent basket might be expired, error: ${errorName}`)

      return store.dispatch(actions.redirect(`${routesConfig.client.menu}?from=newcheckout&error=${errorName}`, true))
    }

    if (!store.getState().menuCutoffUntil) {
      await store.dispatch(actions.menuLoadDays())
    }

    return store.dispatch(actions.pricingRequest())
      .catch((err) => {
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
    }
  }

  componentDidMount() {
    Overlay.forceCloseAll()

    const { store } = this.context
    const { query = {}, params = {}, browser, trackSignupStep, changeRecaptcha, isCheckoutRedesignEnabled } = this.props

    Checkout.fetchData({ store, query, params, browser, isCheckoutRedesignEnabled }).then(() => {
      trackSignupStep(1)
    }).then(() => {
      this.setState({
        isCreatingPreviewOrder: false,
      })
    })
    loadCheckoutScript(() => {
      this.setState({
        checkoutScriptReady: true,
      })
    })

    changeRecaptcha()
  }

  componentWillReceiveProps(nextProps) {
    const { tariffId, loadPrices } = this.props

    if (tariffId !== nextProps.tariffId) {
      loadPrices()
    }
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

  isLastStep = (steps, currentStep) => Boolean(steps.indexOf(currentStep) === (steps.length - 1))

  getNextStep = (steps, currentStep) => {
    const index = steps.indexOf(currentStep)

    return steps[index + 1]
  }

  getNextStepName = (stepMapping, steps, currentStep) => {
    const nextStepURL = this.getNextStep(steps, currentStep)

    let nextStepName = ''
    if (nextStepURL) {
      nextStepName = stepMapping[nextStepURL] && stepMapping[nextStepURL].humanName
    }

    return nextStepName
  }

  onStepChange = (steps, currentStep) => () => {
    const nextStep = this.getNextStep(steps, currentStep)
    const { trackSignupStep, redirect } = this.props

    if (nextStep) {
      trackSignupStep(nextStep)
      redirect(`${routesConfig.client['check-out']}/${nextStep}`)
    }
  }

  trackClick = (type, property) => {
    const { trackCheckoutButtonPressed } = this.props

    trackCheckoutButtonPressed(type, property)
  }

  renderSteps = (stepMapping, steps, currentStep) => {
    const { browser, submitOrder, trackUTMAndPromoCode, isCheckoutRedesignEnabled } = this.props
    const { checkoutScriptReady } = this.state
    const step = stepMapping[currentStep]
    const isCheckoutPaymentStep = (currentStep === 'payment')
    const props = {
      trackClick: this.trackClick,
      onStepChange: this.onStepChange(steps, currentStep),
      isLastStep: this.isLastStep(steps, currentStep),
      nextStepName: this.getNextStepName(stepMapping, steps, currentStep),
      reloadCheckoutScript: this.reloadCheckoutScript,
      submitOrder,
      browser,
      checkoutScriptReady,
      trackUTMAndPromoCode,
      isCheckoutRedesignEnabled
    }

    let element = <div />

    if (step && (!isCheckoutPaymentStep)) {
      element = React.createElement(step.component, props)
    }

    return element
  }

  renderStaticPayment = (stepMapping, steps, currentStep, isCheckoutRedesignEnabled) => {
    const { browser, submitOrder } = this.props
    const onPaymentStep = (currentStep === 'payment')
    const { checkoutScriptReady } = this.state

    return (
      <CheckoutPayment
        browser={browser}
        submitOrder={submitOrder}
        checkoutScriptReady={checkoutScriptReady}
        prerender={!onPaymentStep}
        isLastStep={this.isLastStep(steps, currentStep)}
        onStepChange={this.onStepChange(steps, currentStep)}
        nextStepName={this.getNextStepName(stepMapping, steps, currentStep)}
        isCheckoutRedesignEnabled={isCheckoutRedesignEnabled}
      />
    )
  }

  renderMobileSteps = () => {
    const { params: { stepName }, isCheckoutRedesignEnabled } = this.props
    const mobileSteps = isCheckoutRedesignEnabled ? defaultDesktop : defaultMobile
    const isDeliveryStep = stepName === 'delivery'
    const isYourDetailsStep = stepName === 'yourdetails'
    const stepsMapping = mobileStepMapping(isCheckoutRedesignEnabled)

    return (
      <Div>
        {this.renderProgressBar(stepsMapping, mobileSteps, stepName)}
        {isCheckoutRedesignEnabled && !isDeliveryStep && (
          <Div margin={{ bottom: 'MD' }}>
            <Summary showPromocode />
          </Div>
        )}
        {this.renderSteps(stepsMapping, mobileSteps, stepName)}
        {this.renderStaticPayment(stepsMapping, mobileSteps, stepName, isCheckoutRedesignEnabled)}
        {isCheckoutRedesignEnabled && !isDeliveryStep && !isYourDetailsStep && (
          <Div margin={{ top: 'MD' }}>
            <BoxDetails />
          </Div>
        )}
      </Div>
    )
  }

  renderDesktopSteps = () => {
    const { params: {stepName}} = this.props
    const {isCreatingPreviewOrder} = this.state

    return (
      <Div className={css.rowCheckout}>
        <Div className={css.section}>
          {this.renderProgressBar(desktopStepMapping, defaultDesktop, stepName)}
          {this.renderSteps(desktopStepMapping, defaultDesktop, stepName)}
          {this.renderStaticPayment(desktopStepMapping, defaultDesktop, stepName)}
        </Div>

        <Div className={css.aside}>
          <Summary showPromocode isLoading={isCreatingPreviewOrder} />
          <Div margin={{ top: 'LG' }}>
            <BoxDetails />
          </Div>
        </Div>
      </Div>
    )
  }

  renderProgressBar = (stepMapping, steps, currentStep) => {
    const { isCheckoutRedesignEnabled } = this.props

    return (
      <Div margin={{ bottom: 'MD' }}>
        <ProgressBar
          currentId={currentStep}
          isCheckoutRedesignEnabled={isCheckoutRedesignEnabled}
          items={steps.reduce((accumulatedSteps, stepName) => {
            accumulatedSteps.push({
              id: stepName,
              label: stepMapping[stepName].humanName,
            })

            return accumulatedSteps
          }, [])}
        />
      </Div>
    )
  }

  render() {
    const { browser } = this.props
    const renderSteps = browser === 'mobile' ? this.renderMobileSteps : this.renderDesktopSteps

    return (
      <Div className={css.checkoutContainer} data-testing="checkoutContainer">
        <Div className={css.checkoutContent}>
          {renderSteps()}
        </Div>
      </Div>
    )
  }
}

Checkout.propTypes = propTypes

Checkout.defaultProps = defaultProps

Checkout.contextTypes = contextTypes

export { Checkout }
