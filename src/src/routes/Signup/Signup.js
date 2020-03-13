import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Immutable from 'immutable'
import config from 'config/signup'
import routes from 'config/routes'
import actions from 'actions'
import { stepByName, stepBySlug, getPromocodeQueryParam } from 'utils/signup'
import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'

import css from './Signup.css'

import { BoxSizeStep } from './Steps/BoxSize'
import { PostcodeStep } from './Steps/Postcode'
import { DeliveryStep } from './Steps/Delivery'

import { Dots } from './Dots'

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
    })
  }),
  params: PropTypes.shape({
    stepName: PropTypes.string,
  }),
  currentStepName: PropTypes.string,
  changeStep: PropTypes.func.isRequired,
}

const defaultProps = {
  stepName: '',
  steps: Immutable.List(),
  goToStep: () => {},
  location: {
    query: {
      steps: '',
      promo_code: '',
    }
  },
  params: {
    stepName: '',
  },
  currentStepName: '',
}

const contextTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

class Signup extends React.PureComponent {
  static fetchData = async ({ store, params = {}, query = {}}) => {
    let steps = Immutable.List(config.defaultSteps)
    const querySteps = query.steps ? query.steps.split(',') : []
    const promoCode = query.promo_code
    const signupStepsFeature = store.getState().features.getIn(['signupSteps', 'value'])
    const featureSteps = signupStepsFeature ? signupStepsFeature.split(',') : []
    const signupSteps = store.getState().signup.getIn(['wizard', 'steps'])

    if (querySteps.length) {
      const requestedSteps = querySteps
      steps = Immutable.List(requestedSteps)
    } else if (featureSteps.length) {
      const requestedSteps = featureSteps
      steps = Immutable.List(requestedSteps)
    } else if (Immutable.Iterable.isIterable(signupSteps) && signupSteps.size) {
      steps = signupSteps
    }

    steps = steps
      .filter(step => step && availableSteps.includes(step))

    const firstStep = stepByName(steps.first())

    // defensive code to ensure menu load days works below for deeplinks
    const isSignUpPage = true
    await loadMenuServiceDataIfDeepLinked(store, isSignUpPage)

    if (!store.getState().menuCutoffUntil) {
      await store.dispatch(actions.menuLoadDays())
    }

    store.dispatch(
      actions.signupStepsReceive(steps)
    )

    store.dispatch(
      actions.signupSetStep(firstStep)
    )

    // No Step specified and no query string specified
    if (!params.stepName && querySteps.length === 0) {
      return store.dispatch(actions.redirect(`${routes.client.signup}/${firstStep.get('slug')}${getPromocodeQueryParam(promoCode, '?')}`))
    }

    // No Step specified but query steps overwrite
    if (!params.stepName && querySteps.length > 0) {
      const step = stepByName(querySteps.slice(0, 1).pop())
      const futureSteps = querySteps.join(',')

      return store.dispatch(actions.redirect(`${routes.client.signup}/${step.get('slug')}?steps=${futureSteps}${getPromocodeQueryParam(promoCode)}`))
    }

    // Step landed is not the first step
    if (params.stepName && firstStep.get('slug') !== params.stepName) {
      return store.dispatch(actions.redirect(`${routes.client.signup}/${firstStep.get('slug')}${getPromocodeQueryParam(promoCode, '?')}`))
    }

    return null
  }

  componentDidMount() {
    const { location, params } = this.props
    const { store } = this.context
    const query = location ? location.query : {}
    Signup.fetchData({ store, query, params })
  }

  componentWillReceiveProps(nextProps) {
    const { changeStep } = this.props
    const step = stepByName(nextProps.currentStepName)
    if (nextProps.stepName !== step.get('slug')) {
      changeStep(stepBySlug(nextProps.stepName))
    }
  }

  getCurrentStepNumber(steps) {
    const { stepName } = this.props
    const stepNumber = steps.findIndex(step => step.get('slug') === stepName)

    if (stepNumber < 0) {
      return 0
    }

    return stepNumber
  }

  getSteps() {
    const { steps } = this.props

    const signupSteps = steps
      .filter(step => step && availableSteps.includes(step))
      .map(stepName => stepByName(stepName))

    if (signupSteps.size === 0) {
      return Immutable.fromJS(config.defaultSteps.map(stepByName))
    }

    return signupSteps
  }

  renderStep = (name, nextStepName, currentStepNumber, isLastStep) => {
    const { goToStep, stepName } = this.props
    const Component = components[name]

    return (
      <Component
        next={() => goToStep(nextStepName)}
        nextStepName={nextStepName}
        currentStepName={stepName}
        stepNumber={currentStepNumber}
        isLastStep={isLastStep}
        active={stepName === name}
      />
    )
  }

  renderSteps = (steps, currentStepNumber) => (
    steps.map((step, stepNumber) => (
      <div
        className={css.step}
        key={step.get('slug')}
      >
        {this.renderStep(
          step.get('name'),
          steps.getIn([stepNumber + 1, 'name']),
          currentStepNumber,
          stepNumber === steps.size - 1
        )}
      </div>
    )).toArray()
  )

  render() {
    const steps = this.getSteps()
    const stepNumber = this.getCurrentStepNumber(steps)

    return (
      <div className={css.signupContainer}>
        <Helmet
          style={[{
            cssText: `
              #react-root {
                height: 100%;
              }
            `,
          }]}
        />
        <div className={css.stepsContainer}>
          <div className={css.animationContainer}>
            <div className={css.animation} style={{ marginLeft: `-${stepNumber}00%`, width: `${steps.size + 1}00%` }}>
              {this.renderSteps(steps, stepNumber)}
            </div>
          </div>
        </div>
        <div className={css.dotsContainer}>
          <Dots steps={steps.size} stepNo={stepNumber} />
        </div>
      </div>
    )
  }
}

Signup.propTypes = propTypes
Signup.defaultProps = defaultProps
Signup.contextTypes = contextTypes

export { Signup }
