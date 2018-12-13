import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import logger from 'utils/logger'
import routesConfig from 'config/routes'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import Overlay from 'Overlay'
import { Div } from 'Page/Elements'
import ProgressBar from 'ProgressBar'

import css from './Checkout.css'
import { loadCheckoutScript } from './loadCheckoutScript'

import DesktopAboutYou from './Steps/Desktop/AboutYou'
import DesktopBoxDetails from './Steps/Desktop/BoxDetails'
import DesktopDelivery from './Steps/Desktop/Delivery'
import DesktopPayment from './Steps/Desktop/Payment'
import Summary from './Components/Summary'
import BoxDetails from './Components/BoxDetails'

import MobileYourDetails from './Steps/Mobile/YourDetails'
import MobileBoxDetails from './Steps/Mobile/BoxDetails'
import MobilePayment from './Steps/Mobile/Payment'

import { CheckoutPayment } from './Components/CheckoutPayment'

const defaultDesktop = ['aboutyou', 'delivery', 'payment']
const defaultMobile = ['boxdetails', 'yourdetails', 'payment']

const desktopStepMapping = {
  boxdetails: { component: DesktopBoxDetails, humanName: 'Box Details' },
  aboutyou: { component: DesktopAboutYou, humanName: 'About You' },
  delivery: { component: DesktopDelivery, humanName: 'Delivery' },
  payment: { component: DesktopPayment, humanName: 'Payment' },
}

const mobileStepMapping = {
  boxdetails: { component: MobileBoxDetails, humanName: 'Box Details' },
  yourdetails: { component: MobileYourDetails, humanName: 'Your Details' },
  payment: { component: MobilePayment, humanName: 'Payment' },
}

class Checkout extends React.PureComponent {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    params: PropTypes.object,
    browser: PropTypes.string,
    redirect: PropTypes.func,
    submitOrder: PropTypes.func,
    menuLoadBoxPrices: PropTypes.func,
    trackSignupStep: PropTypes.func,
    trackingOrderPlace: PropTypes.func,
    tariffId: PropTypes.string,
    checkoutPaymentFeature: PropTypes.bool,
  }

  static defaultProps = {
    params: {},
    redirect: () => { },
    checkoutPaymentFeature: false,
  }

  constructor(state, props) {
    super(state, props)
    this.state = {
      isCreatingPreviewOrder: true,
      checkoutScriptReady: false,
    }
  }

  static fetchData = async ({ store, query, params, browser }) => {
    const steps = browser === 'mobile' ? defaultMobile : defaultDesktop

    const firstStep = steps[0]
    const currentStep = params && params.stepName

    /**
     * redirect to the first step
     */
    if (!query.steps && firstStep && (!currentStep || currentStep !== firstStep)) {
      store.dispatch(actions.replace(`${routesConfig.client['check-out']}/${firstStep}`))
    }

    if (!store.getState().boxSummaryDeliveryDays || (typeof store.getState().boxSummaryDeliveryDays === 'object' && store.getState().boxSummaryDeliveryDays.size === 0)) {
      await store.dispatch(actions.menuLoadDays())
      await store.dispatch(actions.boxSummaryDeliveryDaysLoad())
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
    let errorName = 'undefined-error'
    if (previewOrderError) {
      switch (previewOrderError.code) {
      case 'out-of-stock':
        errorName = 'no-stock'
        break
      case 'basket-expired':
        errorName = 'basket-expired'
        break
      default:
        break
      }
    }

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

  componentDidMount() {
    Overlay.forceCloseAll()

    const { store } = this.context
    const { checkoutPaymentFeature, query = {}, params = {}, browser, trackSignupStep } = this.props

    Checkout.fetchData({ store, query, params, browser }).then(() => {
      trackSignupStep(1)
    }).then(() => {
      this.setState({
        isCreatingPreviewOrder: false,
      })
    })
    if (checkoutPaymentFeature) {
      loadCheckoutScript(() => {
        this.setState({
          checkoutScriptReady: true,
        })
      })
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

  componentWillReceiveProps(nextProps) {
    if (this.props.tariffId !== nextProps.tariffId) {
      this.props.loadPrices()
    }
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

    if (nextStep) {
      this.props.trackSignupStep(nextStep)
      this.props.redirect(`${routesConfig.client['check-out']}/${nextStep}`)
    }
  }

  renderSteps = (stepMapping, steps, currentStep) => {
    const { browser, checkoutPaymentFeature, submitOrder, trackingOrderPlace } = this.props
    const { checkoutScriptReady } = this.state
    const step = stepMapping[currentStep]
    const isCheckoutPaymentStep = checkoutPaymentFeature && currentStep === 'payment'
    const props = {
      onStepChange: this.onStepChange(steps, currentStep),
      isLastStep: this.isLastStep(steps, currentStep),
      nextStepName: this.getNextStepName(stepMapping, steps, currentStep),
      reloadCheckoutScript: this.reloadCheckoutScript,
      submitOrder,
      browser,
      trackingOrderPlace,
      checkoutScriptReady,
    }

    let element = <div />

    if (step && (!isCheckoutPaymentStep)) {
      element = React.createElement(step.component, props)
    }

    return element
  }

  renderStaticPayment = (stepMapping, steps, currentStep) => {
    const { browser, checkoutPaymentFeature, submitOrder } = this.props
    const onPaymentStep = currentStep === 'payment'
    const { checkoutScriptReady } = this.state

    const checkoutProps = {
      browser,
      submitOrder,
      checkoutScriptReady,
      prerender: !onPaymentStep,
      isLastStep: this.isLastStep(steps, currentStep),
      onStepChange: this.onStepChange(steps, currentStep),
      nextStepName: this.getNextStepName(stepMapping, steps, currentStep),
    }

    return (checkoutPaymentFeature) ? (
      <CheckoutPayment
        {...checkoutProps}
      />
    ) : null
  }

  renderMobileSteps = () => (
    <Div>
      {this.renderProgressBar(mobileStepMapping, defaultMobile, this.props.params.stepName)}
      {this.renderSteps(mobileStepMapping, defaultMobile, this.props.params.stepName)}
      {this.renderStaticPayment(mobileStepMapping, defaultMobile, this.props.params.stepName)}
    </Div>
  )

  renderDesktopSteps = () => (
    <Div className={css.row}>
      <Div className={css.section}>
        {this.renderProgressBar(desktopStepMapping, defaultDesktop, this.props.params.stepName)}
        {this.renderSteps(desktopStepMapping, defaultDesktop, this.props.params.stepName)}
        {this.renderStaticPayment(desktopStepMapping, defaultDesktop, this.props.params.stepName)}
      </Div>

      <Div className={css.aside}>
        <Summary showPromocode isLoading={this.state.isCreatingPreviewOrder} />
        <Div margin={{ top: 'LG' }}>
          <BoxDetails />
        </Div>
      </Div>
    </Div>
  )

  renderProgressBar = (stepMapping, steps, currentStep) => (
    <Div margin={{ bottom: 'MD' }}>
      <ProgressBar
        currentId={currentStep}
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

  render() {
    const { browser } = this.props
    const renderSteps = browser === 'mobile' ? this.renderMobileSteps : this.renderDesktopSteps

    return (
      <Div className={css.checkoutContainer} data-testing="checkoutContainer">
        <Div className={css.content}>
          {renderSteps()}
        </Div>
      </Div>
    )
  }
}

export default Checkout
