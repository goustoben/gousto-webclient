import PropTypes from 'prop-types'
import React, { Children, PureComponent } from 'react'
import { StepContent } from '../StepContent'
import { StepButtons } from '../StepButtons'
import { StepIndicator } from '../StepIndicator'
import css from './Stepper.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.shape({
    next: PropTypes.string,
    skip: PropTypes.string,
  }),
  isContinueDisabled: PropTypes.bool,
  isSkipButtonVisible: PropTypes.bool,
  stepNumber: PropTypes.number,
  stepIndicator: PropTypes.shape({
    current: PropTypes.number,
    size: PropTypes.number,
  }),
  onContinueClick: PropTypes.func,
  onSkipClick: PropTypes.func,
}

const defaultProps = {
  content: {
    next: 'Next',
    skip: 'Skip',
  },
  isContinueDisabled: false,
  isSkipButtonVisible: true,
  onContinueClick: null,
  onSkipClick: null,
  stepNumber: 1,
  stepIndicator: {},
}

class Stepper extends PureComponent {
  constructor(props) {
    super(props)

    const { children, stepNumber } = this.props

    this.state = {
      currentStep: stepNumber,
      numberOfSteps: Children.count(children),
    }
  }

  componentDidUpdate(prevProps) {
    const { stepNumber } = this.props

    if (prevProps.stepNumber !== stepNumber) {
      this.setState({ currentStep: stepNumber })
    }
  }

  onStepperContinueClick = () => {
    const { onContinueClick } = this.props

    if (onContinueClick !== null) {
      const { currentStep } = this.state

      onContinueClick({ currentStep })
    }
  }

  onStepperSkipClick = () => {
    const { onSkipClick } = this.props

    if (onSkipClick !== null) {
      const { currentStep } = this.state

      onSkipClick({ currentStep })
    }
  }

  render() {
    const {
      content,
      children,
      isContinueDisabled,
      isSkipButtonVisible,
      stepIndicator,
    } = this.props
    const { currentStep, numberOfSteps } = this.state
    const { current: stepIndicatorCurrent, size: stepIndicatorSize } = stepIndicator

    return (
      <div className={css.container}>
        {(stepIndicatorCurrent && stepIndicatorSize)
          ? (
            <StepIndicator
              current={stepIndicatorCurrent + currentStep}
              size={stepIndicatorSize}
            />
          )
          : (
            <StepIndicator
              current={currentStep}
              size={numberOfSteps}
            />
          )}
        <StepContent step={currentStep} size={numberOfSteps}>
          {children}
        </StepContent>
        <StepButtons
          isContinueDisabled={isContinueDisabled}
          isSkipButtonVisible={isSkipButtonVisible}
          labelNext={content.next}
          labelSkip={content.skip}
          onContinueClick={this.onStepperContinueClick}
          onSkipClick={this.onStepperSkipClick}
        />
      </div>
    )
  }
}

Stepper.defaultProps = defaultProps
Stepper.propTypes = propTypes

export { Stepper }
