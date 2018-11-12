import Immutable from 'immutable' /* eslint-disable new-cap */
import GoustoException from 'utils/GoustoException'

export function pauseReasonsAreCategories(pauseReasons = Immutable.List([])) {
  let childrenFound = false

  try {
    childrenFound = pauseReasons.some(reason => {
      const children = reason.get('children', Immutable.List([]))

      return children && children.size
    })
  } catch (err) {
    throw new GoustoException('Cannot determine if pause reasons are categories: pause reasons must be Immutable List')
  }

  return childrenFound
}

export function getActivePauseStep(activeSteps, activeStepId) {
  const errorPrefix = 'Cannot find active step:'

  if (!activeSteps) {
    throw new GoustoException(`${errorPrefix} activeSteps is not provided`)
  }

  if (!activeStepId) {
    throw new GoustoException(`${errorPrefix} activeStepId is not provided`)
  }

  let activeStep

  try {
    activeStep = activeSteps.find((step, stepId) => stepId === activeStepId)
  } catch (err) {
    throw new GoustoException(`${errorPrefix} activeSteps must be iterable`)
  }

  return activeStep
}

export function getReasonsFromStore(reasonsStore, chosenReasonIds = []) {
  const errorPrefix = 'Cannot get reasons from store:'

  if (!reasonsStore) {
    throw new GoustoException(`${errorPrefix} reasonsStore is not provided`)
  }

  let reasons

  try {
    reasons = chosenReasonIds.reduce((currentReasonSet, chosenReasonId) =>
      currentReasonSet.find(reason => reason.get('id') === chosenReasonId, undefined, Immutable.List([]))
        .get('children', Immutable.List([]))
    , reasonsStore)
  } catch (err) {
    throw new GoustoException(`${errorPrefix} reasonsStore must be deeply Immutable`)
  }

  return reasons
}
