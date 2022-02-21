import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { ReactReduxContext } from 'react-redux'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import routes from 'config/routes'
import actions from 'actions'
import {
  stepByName,
  getPromocodeQueryParam,
  findStepBySlug,
  getStepFromPathname,
} from 'utils/signup'
import { StepIndicator } from 'goustouicomponents'
import { menuLoadBoxPrices } from 'actions/menu'

import { getPromoCode } from 'selectors/basket'
import { promoGet } from 'actions/promos'
import { getCurrentPromoCodeData } from 'routes/Signup/signupSelectors'
import { hotjarSkipWizard } from 'actions/trackingKeys'
import { invokeHotjarEvent } from 'utils/hotjarUtils'

import css from './Signup.css'

import { BoxSizeStep } from './Steps/BoxSize'
import { RecipesPerBoxStepContainer } from './Steps/RecipesPerBox'
import { PostcodeStep } from './Steps/Postcode'
import { DeliveryStep } from './Steps/Delivery'
import { DiscountAppliedBar } from './Components/DiscountAppliedBar/DiscountAppliedBar'
import { SellThePropositionPageContainer } from './Components/SellThePropositionPage/SellThePropositionPageContainer'
import { CheckAccountPageContainer } from './Components/CheckAccountPage'
import { ApplyVoucherPageContainer } from './Components/ApplyVoucherPage'

const components = {
  boxSize: BoxSizeStep,
  recipesPerBox: RecipesPerBoxStepContainer,
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
  orderDiscount: PropTypes.string,
  promoModalVisible: PropTypes.bool.isRequired,
  promoBannerState: PropTypes.shape({
    canApplyPromo: PropTypes.bool,
    basketPromo: PropTypes.string,
  }),
  trackDiscountVisibility: PropTypes.func,
  isDiscountAppliedBarDismissed: PropTypes.bool,
  signupDismissDiscountAppliedBar: PropTypes.func,
  signupSetStep: PropTypes.func,
  isGoustoOnDemandEnabled: PropTypes.bool,
  isWizardWithoutImagesEnabled: PropTypes.bool,
  shouldSkipWizardByFeature: PropTypes.bool,
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
  promoBannerState: {
    canApplyPromo: false,
  },
  orderDiscount: '',
  trackDiscountVisibility: () => {},
  isDiscountAppliedBarDismissed: false,
  signupDismissDiscountAppliedBar: () => {},
  signupSetStep: () => {},
  isGoustoOnDemandEnabled: false,
  isWizardWithoutImagesEnabled: false,
  shouldSkipWizardByFeature: false,
}

const postCodePath = '/signup/postcode'

class Signup extends PureComponent {
  static fetchData = async ({ store, params = {}, query = {}, options = {} }) => {
    let steps = Immutable.List(signupConfig.defaultSteps)
    const querySteps = query.steps ? query.steps.split(',') : []
    const promoCode = query.promo_code

    const signupStepsFeature = store.getState().features.getIn(['signupSteps', 'value'])
    const featureSteps = signupStepsFeature ? signupStepsFeature.split(',') : []
    const signupSteps = store.getState().signup.getIn(['wizard', 'steps'])
    const { shouldSetStepFromParams, isGoustoOnDemandEnabled, shouldSkipWizardByFeature } = options

    if (querySteps.length) {
      steps = Immutable.List(querySteps)
    } else if (featureSteps.length) {
      steps = Immutable.List(featureSteps)
    } else if (Immutable.Iterable.isIterable(signupSteps) && signupSteps.size) {
      steps = signupSteps
    }

    steps = steps.filter((step) => step && availableSteps.includes(step))

    const firstStep = stepByName(steps.first())

    if (!store.getState().menuCutoffUntil) {
      await store.dispatch(actions.menuLoadDays())
    }

    store.dispatch(actions.signupStepsReceive(steps))

    let stepToSet = firstStep

    if (shouldSetStepFromParams) {
      const stepSlug = params.stepName
      const requestedStep = findStepBySlug(stepSlug)
      if (requestedStep) {
        stepToSet = requestedStep
      }
    }

    store.dispatch(actions.signupSetStep(stepToSet))

    if (isGoustoOnDemandEnabled && params.stepName !== signupConfig.checkAccountPageSlug) {
      const state = store.getState()
      if (state.menuBoxPrices.size === 0) {
        store.dispatch(menuLoadBoxPrices())
      }

      const basketPromoCode = getPromoCode(state)
      if (basketPromoCode && !getCurrentPromoCodeData(state)) {
        await store.dispatch(promoGet(basketPromoCode))
      }
    }

    if (shouldSkipWizardByFeature && !isGoustoOnDemandEnabled) {
      invokeHotjarEvent(hotjarSkipWizard)

      return store.dispatch(actions.redirect(routes.client.menu))
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
      // This condition is for server rendering, where isGoustoOnDemandEnabled
      // is not being set: don't redirect when landing directly on "check
      // account" page or "apply voucher" page.
      params.stepName !== signupConfig.checkAccountPageSlug &&
      params.stepName !== signupConfig.applyVoucherPageSlug &&
      params.pathname !== postCodePath &&
      !shouldSetStepFromParams
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
      orderDiscount,
      signupSetStep,
      isGoustoOnDemandEnabled,
      shouldSkipWizardByFeature,
    } = this.props
    const { store } = this.context
    const query = location ? location.query : {}
    const options = {
      orderDiscount,
      shouldSetStepFromParams: true,
      isGoustoOnDemandEnabled,
      shouldSkipWizardByFeature,
    }

    Signup.fetchData({ store, query, params, options })
    this.unlistenHistory = browserHistory.listen(({ pathname }) => {
      const step = getStepFromPathname(pathname)
      signupSetStep(step)
    })
  }

  componentWillUnmount() {
    this.unlistenHistory()
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

  renderSteps = (steps, currentStepNumber) => {
    const { goToStep, stepName, isGoustoOnDemandEnabled, isWizardWithoutImagesEnabled } = this.props
    const step = steps.getIn([currentStepNumber, 'name'])
    const name = components[stepName]
    const isLastStep = currentStepNumber === steps.size - 1
    const nextStepName = steps.getIn([currentStepNumber + 1, 'name'])
    const Component = components[step]

    return (
      <Component
        next={() => goToStep(nextStepName)}
        nextStepName={nextStepName}
        currentStepName={stepName}
        stepNumber={currentStepNumber}
        isLastStep={isLastStep}
        active={stepName === name}
        isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
        isWizardWithoutImagesEnabled={isWizardWithoutImagesEnabled}
      />
    )
  }

  render() {
    const {
      stepName,
      promoModalVisible,
      promoBannerState,
      trackDiscountVisibility,
      isDiscountAppliedBarDismissed,
      signupDismissDiscountAppliedBar,
      isGoustoOnDemandEnabled,
    } = this.props

    if (stepName === signupConfig.sellThePropositionPagePath) {
      return <SellThePropositionPageContainer />
    }

    if (stepName === signupConfig.checkAccountPageSlug) {
      return <CheckAccountPageContainer />
    }

    if (stepName === signupConfig.applyVoucherPageSlug) {
      return <ApplyVoucherPageContainer />
    }

    const steps = this.getSteps()
    const stepNumber = this.getCurrentStepNumber(steps)

    const currentStep = steps.find((step) => step.get('slug') === stepName) || steps.get(0)
    const currentStepName = currentStep.get('name')

    const { canApplyPromo, basketPromo } = promoBannerState

    const isDiscountApplied = !promoModalVisible && !canApplyPromo

    return (
      <div
        className={classNames(css.signupContainer, {
          [css.discountApplied]: isDiscountApplied,
          [css.goustoOnDemandContainer]: isGoustoOnDemandEnabled,
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
          isPromoBarHidden={!basketPromo || promoModalVisible}
          trackDiscountVisibility={trackDiscountVisibility}
          wizardStep={currentStepName}
          signupDismissDiscountAppliedBar={signupDismissDiscountAppliedBar}
          isDiscountAppliedBarDismissed={isDiscountAppliedBarDismissed}
        />
        <div className={css.stepsContainer}>
          <StepIndicator current={stepNumber + 1} size={steps.size} />
          {this.renderSteps(steps, stepNumber)}
        </div>
      </div>
    )
  }
}

Signup.propTypes = propTypes
Signup.defaultProps = defaultProps
Signup.contextType = ReactReduxContext

export { Signup }
