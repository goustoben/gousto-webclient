import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classNames from 'classnames'

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

import { AboutYou as DesktopAboutYou } from './Steps/Desktop/AboutYou'
import { BoxDetails as DesktopBoxDetails } from './Steps/Desktop/BoxDetails'
import { Delivery as DesktopDelivery } from './Steps/Desktop/Delivery'
import { Summary } from './Components/Summary'
import { BoxDetailsContainer } from './Components/BoxDetails'
import { ExpandableBoxSummary } from './Components/ExpandableBoxSummary'

import { YourDetailsForm as MobileYourDetails } from './Steps/Mobile/YourDetails'
import { BoxDetails as MobileBoxDetails } from './Steps/Mobile/BoxDetails'

import { CheckoutPayment } from './Components/CheckoutPayment'
import { ProgressBar } from './Components/ProgressBar'
import { Breadcrumbs } from './Components/Breadcrumbs'

import css from './Checkout.css'

const defaultDesktop = ['aboutyou', 'delivery', 'payment']
const defaultMobile = ['boxdetails', 'yourdetails', 'payment']
const checkoutOverhaulSteps = ['account', 'delivery', 'payment']

const desktopStepMapping = {
  boxdetails: { component: DesktopBoxDetails, humanName: 'Box Details' },
  aboutyou: { component: DesktopAboutYou, humanName: 'About You' },
  delivery: { component: DesktopDelivery, humanName: 'Delivery' },
  payment: { component: CheckoutPayment, humanName: 'Payment' },
}

const mobileStepMapping = {
  boxdetails: { component: MobileBoxDetails, humanName: 'Box Details' },
  yourdetails: { component: MobileYourDetails, humanName: 'Your Details' },
  payment: { component: CheckoutPayment, humanName: 'Payment' },
}

const checkoutOverhaulStepMapping = {
  account: { component: DesktopAboutYou, humanName: 'Account' },
  delivery: { component: DesktopDelivery, humanName: 'Delivery' },
  payment: { component: CheckoutPayment, humanName: 'Payment' },
}

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
    // Not sure how to fix it, so suppressing for now to have clean output.
    // eslint-disable-next-line react/forbid-prop-types
    steps: PropTypes.array
  }),
  loadPrices: PropTypes.func,
  trackCheckoutButtonPressed: PropTypes.func,
  changeRecaptcha: PropTypes.func,
  trackUTMAndPromoCode: PropTypes.func,
  fetchPayPalClientToken: PropTypes.func,
  clearPayPalClientToken: PropTypes.func,
  trackCheckoutNavigationLinks: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  prices: PropTypes.instanceOf(Immutable.Map),

  isLoginOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  loginVisibilityChange: PropTypes.func,
  isMobile: PropTypes.bool,
}

const defaultProps = {
  params: {},
  browser: 'desktop',
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
  fetchPayPalClientToken: () => {},
  clearPayPalClientToken: () => {},
  trackCheckoutNavigationLinks: () => {},
  isCheckoutOverhaulEnabled: false,
  prices: Immutable.Map({}),

  isLoginOpen: false,
  isAuthenticated: false,
  loginVisibilityChange: () => {},
  isMobile: false,
}

const contextTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired
  }),
}

class Checkout extends PureComponent {
  static fetchData = async ({ store, query, params, browser, isCheckoutOverhaulEnabled }) => {
    let steps = browser === 'mobile' ? defaultMobile : defaultDesktop

    if (isCheckoutOverhaulEnabled) {
      steps = checkoutOverhaulSteps
    }

    const firstStep = steps[0]
    const currentStep = params && params.stepName

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
      paypalScriptsReady: false,
    }
  }

  componentDidMount() {
    const { store } = this.context
    const { query = {}, params = {}, browser, trackSignupStep, changeRecaptcha, isCheckoutOverhaulEnabled } = this.props
    const { paypalScriptsReady } = this.state

    Checkout.fetchData({ store, query, params, browser, isCheckoutOverhaulEnabled }).then(() => {
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
    if (!paypalScriptsReady) {
      this.loadPayPal()
    }

    changeRecaptcha()
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { tariffId, loadPrices } = this.props

    if (tariffId !== nextProps.tariffId) {
      loadPrices()
    }
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
    const { browser, submitOrder, trackUTMAndPromoCode, isCheckoutOverhaulEnabled } = this.props
    const { checkoutScriptReady, paypalScriptsReady } = this.state
    const step = stepMapping[currentStep]
    const isCheckoutPaymentStep = (currentStep === 'payment')
    const props = {
      trackClick: this.trackClick,
      onStepChange: this.onStepChange(steps, currentStep),
      isLastStep: this.isLastStep(steps, currentStep),
      nextStepName: this.getNextStepName(stepMapping, steps, currentStep),
      reloadCheckoutScript: this.reloadCheckoutScript,
      onLoginClick: this.handleLoginClick,
      submitOrder,
      browser,
      checkoutScriptReady,
      paypalScriptsReady,
      trackUTMAndPromoCode,
      isCheckoutOverhaulEnabled,
    }

    let element = <div />

    if (step && (!isCheckoutPaymentStep)) {
      element = React.createElement(step.component, props)
    }

    return element
  }

  renderStaticPayment = (stepMapping, steps, currentStep) => {
    const { browser, submitOrder } = this.props
    const onPaymentStep = (currentStep === 'payment')
    const { checkoutScriptReady, paypalScriptsReady } = this.state

    return (
      <CheckoutPayment
        browser={browser}
        submitOrder={submitOrder}
        checkoutScriptReady={checkoutScriptReady}
        paypalScriptsReady={paypalScriptsReady}
        prerender={!onPaymentStep}
        isLastStep={this.isLastStep(steps, currentStep)}
        onStepChange={this.onStepChange(steps, currentStep)}
        nextStepName={this.getNextStepName(stepMapping, steps, currentStep)}
        onLoginClick={this.handleLoginClick}
      />
    )
  }

  renderMobileSteps = () => {
    const { params: { stepName } } = this.props

    return (
      <Div>
        {this.renderProgressBar(mobileStepMapping, defaultMobile, stepName)}
        {this.renderSteps(mobileStepMapping, defaultMobile, stepName)}
        {this.renderStaticPayment(mobileStepMapping, defaultMobile, stepName)}
      </Div>
    )
  }

  renderSummaryAndYourBox = () => {
    const { isCheckoutOverhaulEnabled } = this.props
    const { isCreatingPreviewOrder } = this.state

    return (
      <Fragment>
        <Summary showPromocode isLoading={isCreatingPreviewOrder} />
        <Div margin={{ top: isCheckoutOverhaulEnabled ? 0 : 'LG' }}>
          <BoxDetailsContainer />
        </Div>
      </Fragment>
    )
  }

  renderDesktopSteps = () => {
    const { params: { stepName }, isCheckoutOverhaulEnabled } = this.props
    const stepMapping = isCheckoutOverhaulEnabled ? checkoutOverhaulStepMapping : desktopStepMapping
    const steps = isCheckoutOverhaulEnabled ? checkoutOverhaulSteps : defaultDesktop

    return (
      <Div className={classNames(
        css.rowCheckout,
        { [css.rowCheckoutRedesign]: isCheckoutOverhaulEnabled }
      )}
      >
        <Div className={classNames(css.section, { [css.sectionRedesign]: isCheckoutOverhaulEnabled })}>
          {!isCheckoutOverhaulEnabled && this.renderProgressBar(stepMapping, steps, stepName)}
          {this.renderSteps(stepMapping, steps, stepName)}
          {this.renderStaticPayment(stepMapping, steps, stepName)}
        </Div>

        <Div className={classNames(css.aside, { [css.asideRedesign]: isCheckoutOverhaulEnabled })}>
          {this.renderSummaryAndYourBox()}
        </Div>
      </Div>
    )
  }

  renderProgressBar = (stepMapping, steps, currentStep) => {
    const { isCheckoutOverhaulEnabled, trackCheckoutNavigationLinks } = this.props
    const progressSteps = steps.reduce((accumulatedSteps, stepName) => {
      accumulatedSteps.push({
        id: stepName,
        label: stepMapping[stepName].humanName,
      })

      return accumulatedSteps
    }, [])

    return (
      <Div margin={{ bottom: isCheckoutOverhaulEnabled ? 0 : 'MD' }}>
        {isCheckoutOverhaulEnabled
          ? (
            <Breadcrumbs
              currentId={currentStep || 'account'}
              items={progressSteps}
              trackCheckoutNavigationLinks={trackCheckoutNavigationLinks}
            />
          )
          : (
            <ProgressBar
              currentId={currentStep}
              items={progressSteps}
            />
          )}
      </Div>
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
      <Overlay
        open={isLoginOpen}
        contentClassName={css.modalOverlay}
        from="top"
      >
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

  render() {
    const { browser, isCheckoutOverhaulEnabled, params: { stepName }, prices, trackUTMAndPromoCode } = this.props
    const renderSteps = browser === 'mobile' && !isCheckoutOverhaulEnabled ? this.renderMobileSteps : this.renderDesktopSteps

    return (
      <Div data-testing="checkoutContainer">
        <Div className={classNames(
          css.checkoutContent,
          { [css.checkoutContentRedesign]: isCheckoutOverhaulEnabled }
        )}
        >
          {isCheckoutOverhaulEnabled && (
            <Fragment>
              <ExpandableBoxSummary
                totalToPay={prices.get('total')}
                totalWithoutDiscount={prices.get('recipeTotal')}
                trackUTMAndPromoCode={trackUTMAndPromoCode}
                promoCodeValid={prices.get('promoCodeValid')}
              >
                {this.renderSummaryAndYourBox()}
              </ExpandableBoxSummary>
              {this.renderProgressBar(checkoutOverhaulStepMapping, checkoutOverhaulSteps, stepName)}
            </Fragment>
          )}
          {renderSteps()}
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
