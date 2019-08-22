import { connect } from 'react-redux'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { ShortlistTutorial } from './ShortlistTutorial'

const mapStateToProps = (state) => {
  const { request, tutorial } = state
  const isJustForYouShown = tutorial.getIn(['visible', 'justforyou']) && !tutorial.getIn(['viewed', 'justforyou'])
  const shortlistTutorialStep1Viewed = tutorial.getIn(['viewed', 'shortlistStep1'])
  const shortlistTutorialStep2Viewed = tutorial.getIn(['viewed', 'shortlistStep2'])
  const shouldShowTutorial = !shortlistTutorialStep1Viewed || !shortlistTutorialStep2Viewed
  const shouldShow = request.get('browser') === 'mobile' && !isJustForYouShown && shouldShowTutorial
  const step = !tutorial.getIn(['viewed', 'shortlistStep1']) ? 1 : 2

  return {
    step,
    show: shouldShow,
    stepSelector: step === 1 ? "[data-slug='heart']" : step === 2 ? "[data-slug='box-summary-mobile']" : null
  }
}

const mapDispatchToProps = {
  incrementTutorialViewed,
  tutorialTracking
}

const ShortlistTutorialContainer = connect(mapStateToProps, mapDispatchToProps)(ShortlistTutorial)

export { ShortlistTutorialContainer }
