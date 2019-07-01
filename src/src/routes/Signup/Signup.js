import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Immutable from 'immutable'/* eslint-disable new-cap */
import config from 'config/signup'
import routes from 'config/routes'
import actions from 'actions'
import { stepByName, stepBySlug, getPromocodeQueryParam } from 'utils/signup'
import css from './Signup.css'

import WelcomeStep from './Steps/Welcome'
import KidsCookForStep from './Steps/KidsCookFor'
import AdultsCookFor from './Steps/AdultsCookFor'
import BoxSizeStep from './Steps/BoxSize'
import PostcodeStep from './Steps/Postcode'
import DeliveryStep from './Steps/Delivery'
import RecipesStep from './Steps/Recipes'
import FinishStep from './Steps/Finish'

import Dots from './Dots'

const components = {
  foodPref: RecipesStep,
  welcome: WelcomeStep,
  kidsCookFor: KidsCookForStep,
  adultsCookFor: AdultsCookFor,
  boxSize: BoxSizeStep,
  postcode: PostcodeStep,
  delivery: DeliveryStep,
  finish: FinishStep,
}

const availableSteps = Object.keys(components)

class Signup extends React.PureComponent {

  static fetchData = async ({ store, params = {}, query = {} }) => {
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

  static propTypes = {
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

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const store = this.context.store
    const query = this.props.location ? this.props.location.query : {}
    const params = this.props.params || {}
    Signup.fetchData({ store, query, params })
  }

  componentWillReceiveProps(nextProps) {
    const step = stepByName(nextProps.currentStepName)
    if (nextProps.stepName !== step.get('slug')) {
      this.props.changeStep(stepBySlug(nextProps.stepName))
    }
  }

  renderStep = (stepName, nextStepName, currentStepNumber, isLastStep) => {
    const Component = components[stepName]

    return (
      <Component
        next={() => this.props.goToStep(nextStepName)}
        nextStepName={nextStepName}
        currentStepName={this.props.stepName}
        stepNumber={currentStepNumber}
        isLastStep={isLastStep}
        active={this.props.stepName === stepName}
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

  getCurrentStepNumber(steps) {
    const stepNumber =
      steps.findIndex(step => step.get('slug') === this.props.stepName)

    if (stepNumber < 0) {
      return 0
    }

    return stepNumber
  }

  getSteps() {
    const steps = this.props.steps
      .filter(step => step && availableSteps.includes(step))
      .map(stepName => stepByName(stepName))

    if (steps.size === 0) {
      return Immutable.fromJS(config.defaultSteps.map(stepByName))
    }

    return steps
  }

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

export default Signup
