import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { ReactReduxContext } from 'react-redux'
import Helmet from 'react-helmet'
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import { stepByName, getStepFromPathname } from 'utils/signup'
import { StepIndicator } from 'goustouicomponents'
import { fetchSignupData } from 'routes/Signup/utils/fetchSignupData'

import css from './Signup.css'

import { BoxSizeStep } from './Steps/BoxSize'
import { PostcodeStep } from './Steps/Postcode'
import { DeliveryStep } from './Steps/Delivery'
import { DiscountAppliedBar } from './Components/DiscountAppliedBar/DiscountAppliedBar'
import { SellThePropositionPageContainer } from './Components/SellThePropositionPage/SellThePropositionPageContainer'
import { EnterPromoCodeManuallyPage } from './Components/EnterPromoCodeManuallyPage'
import { CheckAccountPageContainer } from './Components/CheckAccountPage'
import { ApplyVoucherPageContainer } from './Components/ApplyVoucherPage'

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

class Signup extends PureComponent {
  static fetchData = fetchSignupData

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

    if (stepName === signupConfig.enterPromoCodeManuallyPageSlug) {
      return <EnterPromoCodeManuallyPage />
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
