export function getModalType(getState) {
    const state = getState()
    if (state.subscriptionPause.get('chosenReasonIds').size === 0) {
        return 'categories'
    }
    const activeStepId = state.subscriptionPause.get('activeStepId')
    if (!activeStepId) {
        return 'reasons'
    }
    const activeSteps = state.subscriptionPause.get('activeSteps')

    return activeSteps.getIn([activeStepId, 'type'])
}
