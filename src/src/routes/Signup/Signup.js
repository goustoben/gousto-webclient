import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import Immutable from 'immutable'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import routes from 'config/routes'
import actions from 'actions'
import { stepByName, stepBySlug, getPromocodeQueryParam } from 'utils/signup'
import { StepIndicator } from 'goustouicomponents'
import { loadMenuServiceDataIfDeepLinked } from '../Menu/fetchData/menuService'

import css from './Signup.css'

import { BoxSizeStep } from './Steps/BoxSize'
import { PostcodeStep } from './Steps/Postcode'
import { DeliveryStep } from './Steps/Delivery'
import { DiscountAppliedBar } from './Components/DiscountAppliedBar/DiscountAppliedBar'
import { updatePricePerServing } from '../../actions/boxPrices'

const components = {
  boxSize: BoxSizeStep,
  postcode: PostcodeStep,
  delivery: DeliveryStep,
}

const availableSteps = Object.keys(components)

const propTypes = {
  stepName: PropTypes.string,
  steps: PropTypes.instanceOf(Immutable.List),
  goToStep: PropTypes.func,
  location: PropTypes.shape({
    query: PropTypes.shape({
      steps: PropTypes.string,
      promo_code: PropTypes.string,
    }),
    pathname: PropTypes.string,
  }),
  params: PropTypes.shape({
    stepName: PropTypes.string,
  }),
  currentStepName: PropTypes.string,
  changeStep: PropTypes.func.isRequired,
  isTastePreferencesEnabled: PropTypes.bool,
  isPricingClarityEnabled: PropTypes.bool,
  orderDiscount: PropTypes.string,
  menuLoadBoxPrices: PropTypes.func.isRequired,
  promoModalVisible: PropTypes.bool.isRequired,
  promoBannerState: PropTypes.shape({
    hide: PropTypes.bool,
  }),
  trackDiscountVisibility: PropTypes.func,
  isWizardPricePerServingEnabled: PropTypes.bool,
  lowestPricePerPortion: PropTypes.shape({
    forTwo: PropTypes.shape({
      priceDiscounted: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
    forFour: PropTypes.shape({
      priceDiscounted: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  }),
}

const defaultProps = {
  stepName: '',
  steps: Immutable.List(),
  goToStep: () => {},
  location: {
    query: {
      steps: '',
      promo_code: '',
    },
  },
  params: {
    stepName: '',
  },
  currentStepName: '',
  promoBannerState: {
    hide: true,
  },
  isTastePreferencesEnabled: false,
  isPricingClarityEnabled: false,
  orderDiscount: '',
  trackDiscountVisibility: () => {},
  isWizardPricePerServingEnabled: false,
  lowestPricePerPortion: {},
}

const contextTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

const postCodePath = '/signup/postcode'

class Signup extends PureComponent {
  static fetchData = async ({ store, params = {}, query = {}, fetchProps = {} }) => {
    let steps = Immutable.List(signupConfig.defaultSteps)
    const querySteps = query.steps ? query.steps.split(',') : []
    const promoCode = query.promo_code
    const signupStepsFeature = store.getState().features.getIn(['signupSteps', 'value'])
    const featureSteps = signupStepsFeature ? signupStepsFeature.split(',') : []
    const signupSteps = store.getState().signup.getIn(['wizard', 'steps'])
    const {
      menuLoadBoxPrices,
      orderDiscount,
      isPricingClarityEnabled,
      isWizardPricePerServingEnabled,
      lowestPricePerPortion,
    } = fetchProps

    if (querySteps.length) {
      steps = Immutable.List(querySteps)
    } else if (featureSteps.length) {
      steps = Immutable.List(featureSteps)
    } else if (Immutable.Iterable.isIterable(signupSteps) && signupSteps.size) {
      steps = signupSteps
    }

    steps = steps.filter((step) => step && availableSteps.includes(step))

    const firstStep = stepByName(steps.first())
    const isBoxSizeStep = firstStep.get('slug') === 'box-size'

    // defensive code to ensure menu load days works below for deeplinks
    const isSignUpPage = true
    await store.dispatch(loadMenuServiceDataIfDeepLinked(isSignUpPage))

    if (!store.getState().menuCutoffUntil) {
      await store.dispatch(actions.menuLoadDays())
    }

    store.dispatch(actions.signupStepsReceive(steps))

    store.dispatch(actions.signupSetStep(firstStep))

    if (isPricingClarityEnabled && isBoxSizeStep && !orderDiscount) {
      menuLoadBoxPrices()
    }

    if (
      isBoxSizeStep &&
      isWizardPricePerServingEnabled &&
      !Object.keys(lowestPricePerPortion).length
    ) {
      store.dispatch(updatePricePerServing())
    }

    // No Step specified and no query string specified
    if (!params.stepName && querySteps.length === 0) {
      return store.dispatch(
        actions.redirect(
          `${routes.client.signup}/${firstStep.get('slug')}${getPromocodeQueryParam(
            promoCode,
            '?'
          )}`
        )
      )
    }

    // No Step specified but query steps overwrite
    if (!params.stepName && querySteps.length > 0) {
      const step = stepByName(querySteps.slice(0, 1).pop())
      const futureSteps = querySteps.join(',')

      return store.dispatch(
        actions.redirect(
          `${routes.client.signup}/${step.get('slug')}?steps=${futureSteps}${getPromocodeQueryParam(
            promoCode
          )}`
        )
      )
    }

    // Step landed is not the first step
    if (
      params.stepName &&
      firstStep.get('slug') !== params.stepName &&
      params.pathname !== postCodePath
    ) {
      return store.dispatch(
        actions.redirect(
          `${routes.client.signup}/${firstStep.get('slug')}${getPromocodeQueryParam(
            promoCode,
            '?'
          )}`
        )
      )
    }

    return null
  }

  componentDidMount() {
    const {
      location,
      params,
      menuLoadBoxPrices,
      orderDiscount,
      isPricingClarityEnabled,
      isWizardPricePerServingEnabled,
      lowestPricePerPortion,
    } = this.props
    const { store } = this.context
    const query = location ? location.query : {}
    const boxPricesExperimentParams = { stepName: 'postcode', pathname: postCodePath }
    const signupParams =
      location.pathname === routes.client.signup ? params : boxPricesExperimentParams
    const fetchProps = {
      isWizardPricePerServingEnabled,
      isPricingClarityEnabled,
      lowestPricePerPortion,
      menuLoadBoxPrices,
      orderDiscount,
    }
    Signup.fetchData({ store, query, params: signupParams, fetchProps })
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { changeStep } = this.props
    const step = stepByName(nextProps.currentStepName)
    if (nextProps.stepName !== step.get('slug')) {
      changeStep(stepBySlug(nextProps.stepName))
    }
  }

  getCurrentStepNumber(steps) {
    const { stepName } = this.props
    const stepNumber = steps.findIndex((step) => step.get('slug') === stepName)

    if (stepNumber < 0) {
      return 0
    }

    return stepNumber
  }

  getSteps() {
    const { steps } = this.props

    const signupSteps = steps
      .filter((step) => step && availableSteps.includes(step))
      .map((stepName) => stepByName(stepName))

    if (signupSteps.size === 0) {
      return Immutable.fromJS(signupConfig.defaultSteps.map(stepByName))
    }

    return signupSteps
  }

  renderStep = (name, nextStepName, currentStepNumber, isLastStep) => {
    const { goToStep, stepName, isPricingClarityEnabled } = this.props
    const Component = components[name]

    return (
      <Component
        next={() => goToStep(nextStepName)}
        nextStepName={nextStepName}
        currentStepName={stepName}
        stepNumber={currentStepNumber}
        isLastStep={isLastStep}
        active={stepName === name}
        isPricingClarityEnabled={isPricingClarityEnabled}
      />
    )
  }

  renderSteps = (steps, currentStepNumber) =>
    steps
      .map((step, stepNumber) => (
        <div className={css.step} key={step.get('slug')}>
          {this.renderStep(
            step.get('name'),
            steps.getIn([stepNumber + 1, 'name']),
            currentStepNumber,
            stepNumber === steps.size - 1
          )}
        </div>
      ))
      .toArray()

  getStepSize = (stepsSize) => {
    const { isTastePreferencesEnabled } = this.props
    if (isTastePreferencesEnabled) {
      return stepsSize + 2
    }

    return stepsSize
  }

  render() {
    const {
      isPricingClarityEnabled,
      stepName,
      promoModalVisible,
      promoBannerState,
      trackDiscountVisibility,
    } = this.props
    const steps = this.getSteps()
    const stepNumber = this.getCurrentStepNumber(steps)

    const currentStep = steps.find((step) => step.get('slug') === stepName) || steps.get(0)
    const currentStepName = currentStep.get('name')

    const isBoxSizeStep = currentStepName === 'boxSize'
    const isPostcodeStep = currentStepName === 'postcode'
    const isDeliveryStep = currentStepName === 'delivery'

    const pricingMinHeight = isPricingClarityEnabled && (isPostcodeStep || isDeliveryStep)
    const autosizeAnimationContainer = isPricingClarityEnabled && isBoxSizeStep
    const isDiscountApplied = !promoModalVisible && promoBannerState.hide

    return (
      <div
        className={classNames(css.signupContainer, {
          [css.priceClarityRedesign]: isPricingClarityEnabled,
          [css.discountApplied]: isDiscountApplied,
        })}
      >
        <Helmet
          style={[
            {
              cssText: `
              #react-root {
                height: 100%;
              }
            `,
            },
          ]}
        />
        <DiscountAppliedBar
          promoModalVisible={promoModalVisible}
          isPromoBarHidden={promoBannerState.hide}
          trackDiscountVisibility={trackDiscountVisibility}
          wizardStep={currentStepName}
        />
        <div
          className={classNames(css.stepsContainer, { [css.pricingMinHeight]: pricingMinHeight })}
        >
          <div
            className={classNames(css.animationContainer, {
              [css.autosize]: autosizeAnimationContainer,
            })}
          >
            <div className={css.stepIndicatorContainer}>
              <StepIndicator current={stepNumber + 1} size={this.getStepSize(steps.size)} />
            </div>
            <div
              className={css.animation}
              style={{ marginLeft: `-${stepNumber}00%`, width: `${steps.size + 1}00%` }}
            >
              {this.renderSteps(steps, stepNumber)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = propTypes
Signup.defaultProps = defaultProps
Signup.contextTypes = contextTypes

export { Signup }
