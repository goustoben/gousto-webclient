import React, { PureComponent } from 'react'

import classNames from 'classnames'
import { StepIndicator } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ReactReduxContext } from 'react-redux'

import { signupConfig } from 'config/signup'
import { AVAILABLE_STEP_COMPONENTS } from 'routes/Signup/constants/AvailableStepComponents'
import { fetchSignupData } from 'routes/Signup/utils/fetchSignupData'
import { openProperStep } from 'routes/Signup/utils/openProperStep'
import { stepByName } from 'utils/signup'

import { ApplyVoucherPageContainer } from './Components/ApplyVoucherPage'
import { CheckAccountPageContainer } from './Components/CheckAccountPage'
import { DiscountAppliedBar } from './Components/DiscountAppliedBar/DiscountAppliedBar'
import { EnterPromoCodeManuallyPage } from './Components/EnterPromoCodeManuallyPage'
import { SellThePropositionPageContainer } from './Components/SellThePropositionPage/SellThePropositionPageContainer'

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
}

const defaultProps = {
  secondarySlug: '',
  stepNames: Immutable.List(),
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

  componentDidMount() {
    const { location, params } = this.props
    const { store } = this.context
    openProperStep(store, location?.query, params).then(() => {
      // without forceUpdate new props.steps would not be applied
      this.forceUpdate()
    })
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
