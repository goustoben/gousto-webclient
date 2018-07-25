import Immutable from 'immutable' /* eslint-disable new-cap */
import getPauseScreenFromConfig from 'utils/getPauseScreenFromConfig'
import getPauseScreenContentMapped from 'utils/getPauseScreenContentMapped'
import * as subUtils from 'utils/subscription'

export default function getPauseScreen(subscriptionPauseState) {
	let staticScreenId
	const errorPrefix = 'getPauseScreen error:'

	try {
		staticScreenId = subscriptionPauseState.get('staticScreenId')
	} catch (err) {
		throw Error(`${errorPrefix} invalid subscriptionPause state`)
	}

	if (staticScreenId) {
		const screenDefaults = getPauseScreenFromConfig(staticScreenId)
		const contentConfig = screenDefaults.get('content', Immutable.Map({}))

		return screenDefaults.set('content', getPauseScreenContentMapped(contentConfig))
	}

	const activeStepId = subscriptionPauseState.get('activeStepId')

	if (activeStepId) {
		const activeStep = subscriptionPauseState.getIn(['activeSteps', activeStepId])
		const contentFromState = activeStep.get('content')

		if (!contentFromState) {
			throw Error(`${errorPrefix} invalid content in step ${activeStepId}`)
		}

		const contextFromState = activeStep.get('context', Immutable.Map({}))
		const screenDefaults = getPauseScreenFromConfig(activeStep.get('type'))
		let screen = screenDefaults.delete('defaults').mergeDeep(activeStep.delete('content'))
		const contentConfig = screenDefaults.get('content', Immutable.Map({}))
		screen = screen.set('preTitle', contentFromState.get('preTitle', screenDefaults.get('preTitle')))
		screen = screen.set('title', contentFromState.get('title', screenDefaults.get('title')))
		screen = screen.set('content', getPauseScreenContentMapped(contentConfig, contentFromState, contextFromState))

		return screen
	}

	const activeReasons = subscriptionPauseState.get('activeReasons')

	if (activeReasons.size) {
		const type = subUtils.pauseReasonsAreCategories(activeReasons) ? 'reasonGrid' : 'reasonList'

		return getPauseScreenFromConfig(type)
	}

	return Immutable.Map({})
}
