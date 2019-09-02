import { connect } from 'react-redux'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { getShortlistTutorialFirstStep, getShortlistTutorialSecondStep } from 'selectors/tutorial'
import { ShortlistTutorial } from './ShortlistTutorial'

const mapStateToProps = (state) => {
  const { request, tutorial, basket } = state
  const isJustForYouShown = tutorial.getIn(['visible', 'justforyou']) && !tutorial.getIn(['viewed', 'justforyou'])
  const shortlistTutorialStep1Viewed = getShortlistTutorialFirstStep(state)
  const shortlistTutorialStep2Viewed = getShortlistTutorialSecondStep(state)
  const recipesInShortlist = basket.getIn(['shortlist', 'shortlistRecipes'])
  const shouldShowTutorial = !shortlistTutorialStep1Viewed || (!shortlistTutorialStep2Viewed && !!recipesInShortlist.size)
  const shouldShow = request.get('browser') === 'mobile' && !isJustForYouShown && shouldShowTutorial
  const step = !shortlistTutorialStep1Viewed ? 1 : 2

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
