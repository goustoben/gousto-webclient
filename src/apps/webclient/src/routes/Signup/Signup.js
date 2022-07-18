import React, { PureComponent } from 'react'

import classNames from 'classnames'
import { StepIndicator } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'

import { AVAILABLE_STEP_COMPONENTS } from 'routes/Signup/constants/AvailableStepComponents'
import { signupConfig } from 'routes/Signup/signupConfig'
import { stepByName } from 'routes/Signup/signupUtils'
import { fetchSignupData } from 'routes/Signup/utils/fetchSignupData'
import { openProperStep } from 'routes/Signup/utils/openProperStep'

import { ApplyVoucherPageContainer } from './Components/ApplyVoucherPage'
import { CheckAccountPageContainer } from './Components/CheckAccountPage'
import { DiscountAppliedBar } from './Components/DiscountAppliedBar/DiscountAppliedBar'
import { EnterPromoCodeManuallyPage } from './Components/EnterPromoCodeManuallyPage'
import { SellThePropositionPageContainer } from './Components/SellThePropositionPage/SellThePropositionPageContainer'
import { getSignupSteps } from './utils/getSignupSteps'

import css from './Signup.css'

const propTypes = {
  secondarySlug: PropTypes.string,
  stepNames: PropTypes.instanceOf(Immutable.List),
  goToStep: PropTypes.func,
  location: PropTypes.shape({
    query: PropTypes.shape({
      promo_code: PropTypes.string,
    }),
    pathname: PropTypes.string,
  }),
  params: PropTypes.shape({
    secondarySlug: PropTypes.string,
  }),
  promoModalVisible: PropTypes.bool.isRequired,
  promoBannerState: PropTypes.shape({
    canApplyPromo: PropTypes.bool,
    basketPromo: PropTypes.string,
  }),
  trackDiscountVisibility: PropTypes.func,
  isDiscountAppliedBarDismissed: PropTypes.bool,
  signupDismissDiscountAppliedBar: PropTypes.func,
  isGoustoOnDemandEnabled: PropTypes.bool,
  isWizardWithoutImagesEnabled: PropTypes.bool,
  signupSetStep: PropTypes.func,
  signupStepsReceive: PropTypes.func.isRequired,
}

const defaultProps = {
  secondarySlug: null,
  stepNames: null,
  goToStep: () => {},
  location: {
    query: {
      promo_code: '',
    },
  },
  params: {
    secondarySlug: '',
  },
  promoBannerState: {
    canApplyPromo: false,
  },
  trackDiscountVisibility: () => {},
  isDiscountAppliedBarDismissed: false,
  signupDismissDiscountAppliedBar: () => {},
  isGoustoOnDemandEnabled: false,
  isWizardWithoutImagesEnabled: false,
  signupSetStep: () => {},
}

class Signup extends PureComponent {
  static fetchData = fetchSignupData

  async componentDidMount() {
    const { signupStepsReceive } = this.props
    const { store } = this.context

    const stepNames = await getSignupSteps(store)
    signupStepsReceive(stepNames)
  }

  componentDidUpdate(prevProps) {
    const { location, params, stepNames } = this.props
    const { store } = this.context

    if (prevProps.stepNames !== stepNames && stepNames !== null) {
      openProperStep(store, stepNames, location?.query, params)
    }
  }

  getCurrentStepNumber(steps) {
    const { secondarySlug } = this.props
    const stepNumber = steps.findIndex((step) => step.get('slug') === secondarySlug)

    if (stepNumber < 0) {
      return 0
    }

    return stepNumber
  }

  getSteps() {
    const { stepNames } = this.props

    const signupSteps = stepNames
      .filter((stepName) => !!AVAILABLE_STEP_COMPONENTS[stepName])
      .map((stepName) => stepByName(stepName))

    if (signupSteps.size === 0) {
      return Immutable.fromJS(signupConfig.defaultSteps.map(stepByName))
    }

    return signupSteps
  }

  renderStep = (steps, currentStepNumber) => {
    const { goToStep, isGoustoOnDemandEnabled, isWizardWithoutImagesEnabled } = this.props
    const currentStepName = steps.getIn([currentStepNumber, 'name'])
    const nextStepName = steps.getIn([currentStepNumber + 1, 'name'])
    const isLastStep = currentStepNumber === steps.size - 1
    const Component = AVAILABLE_STEP_COMPONENTS[currentStepName]
    const { signupSetStep } = this.props
    signupSetStep(stepByName(currentStepName))

    return (
      <Component
        next={() => goToStep(nextStepName)}
        nextStepName={nextStepName}
        currentStepName={currentStepName}
        stepNumber={currentStepNumber}
        isLastStep={isLastStep}
        isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
        isWizardWithoutImagesEnabled={isWizardWithoutImagesEnabled}
      />
    )
  }

  render() {
    const {
      stepNames,
      secondarySlug,
      promoModalVisible,
      promoBannerState,
      trackDiscountVisibility,
      isDiscountAppliedBarDismissed,
      signupDismissDiscountAppliedBar,
      isGoustoOnDemandEnabled,
    } = this.props

    if (secondarySlug === signupConfig.sellThePropositionPageSlug) {
      return <SellThePropositionPageContainer />
    }

    if (secondarySlug === signupConfig.checkAccountPageSlug) {
      return <CheckAccountPageContainer />
    }

    if (secondarySlug === signupConfig.applyVoucherPageSlug) {
      return <ApplyVoucherPageContainer />
    }

    if (secondarySlug === signupConfig.enterPromoCodeManuallyPageSlug) {
      return <EnterPromoCodeManuallyPage />
    }

    if (stepNames === null) {
      // Still loading.
      return null
    }

    const steps = this.getSteps()
    const stepNumber = this.getCurrentStepNumber(steps)

    const currentStep = steps.find((step) => step.get('slug') === secondarySlug) || steps.get(0)
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
          {this.renderStep(steps, stepNumber)}
        </div>
      </div>
    )
  }
}

Signup.propTypes = propTypes
Signup.defaultProps = defaultProps
Signup.contextType = ReactReduxContext

export { Signup }
