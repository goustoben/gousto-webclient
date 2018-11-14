import React, { PropTypes } from 'react'
import Immutable from 'immutable'

import logger from 'utils/logger'
import routesConfig from 'config/routes'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import Overlay from 'Overlay'
import { Div } from 'Page/Elements'
import ProgressBar from 'ProgressBar'

import css from './Checkout.css'
import CheckoutPayment from './Components/CheckoutPayment'

import DesktopAboutYou from './Steps/Desktop/AboutYou'
import DesktopBoxDetails from './Steps/Desktop/BoxDetails'
import DesktopDelivery from './Steps/Desktop/Delivery'
import DesktopPayment from './Steps/Desktop/Payment'
import Summary from './Components/Summary'
import BoxDetails from './Components/BoxDetails'

import MobileYourDetails from './Steps/Mobile/YourDetails'
import MobileBoxDetails from './Steps/Mobile/BoxDetails'
import MobilePayment from './Steps/Mobile/Payment'

const defaultDesktop = ['aboutyou', 'delivery', 'payment']
const defaultMobile = ['boxdetails', 'yourdetails', 'payment']

const desktopStepMapping = (checkoutPaymentFeature) => ({
  boxdetails: { component: DesktopBoxDetails, humanName: 'Box Details' },
  aboutyou: { component: DesktopAboutYou, humanName: 'About You' },
  delivery: { component: DesktopDelivery, humanName: 'Delivery' },
  payment: { component: checkoutPaymentFeature ? CheckoutPayment : DesktopPayment, humanName: 'Payment' },
})

const mobileStepMapping = (checkoutPaymentFeature) => ({
  boxdetails: { component: MobileBoxDetails, humanName: 'Box Details' },
  yourdetails: { component: MobileYourDetails, humanName: 'Your Details' },
  payment: { component: checkoutPaymentFeature ? CheckoutPayment : MobilePayment, humanName: 'Payment' },
})

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
    tariffId: PropTypes.string,
  }

  static defaultProps = {
    params: {},
    redirect: () => { },
  }

  constructor(state, props) {
    super(state, props)
    this.state = {
      isCreatingPreviewOrder: true,
    }
    const { checkoutPayment } = this.props
    this.desktopStepMapping = desktopStepMapping(checkoutPayment)
    this.mobileStepMapping = mobileStepMapping(checkoutPayment)
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
          logger.error({ message: 'Failed to fetch prices.', errors: [err.toString()] })
          store.dispatch(actions.redirect(routesConfig.client.menu, true))
        }
      })
  }

  componentDidMount() {
    Overlay.forceCloseAll()

    const store = this.context.store
    const props = this.props
    const query = props.query || {}
    const params = props.params || {}
    const browser = props.browser
    Checkout.fetchData({ store, query, params, browser }).then(() => {
      this.props.trackSignupStep(1)
    }).then(() => {
      this.setState({
        isCreatingPreviewOrder: false,
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
    const step = stepMapping[currentStep]
    const props = {
      onStepChange: this.onStepChange(steps, currentStep),
      isLastStep: this.isLastStep(steps, currentStep),
      nextStepName: this.getNextStepName(stepMapping, steps, currentStep),
      submitOrder: this.props.submitOrder,
    }

    let element = <div />

    if (step) {
      element = React.createElement(step.component, props)
    }

    return element
  }

  renderMobileSteps = () => (
    <Div>
      {this.renderProgressBar(this.mobileStepMapping, defaultMobile, this.props.params.stepName)}
      {this.renderSteps(this.mobileStepMapping, defaultMobile, this.props.params.stepName)}
    </Div>
  )

  renderDesktopSteps = () => (
    <Div className={css.row}>
      <Div className={css.section}>
        {this.renderProgressBar(this.desktopStepMapping, defaultDesktop, this.props.params.stepName)}
        {this.renderSteps(this.desktopStepMapping, defaultDesktop, this.props.params.stepName)}
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
    const renderSteps = this.props.browser === 'mobile' ? this.renderMobileSteps : this.renderDesktopSteps

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
