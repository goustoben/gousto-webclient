import { connect } from 'react-redux'

import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'

import { getRecommendationShortName } from '../selectors/collections'
import { JustForYouTutorial } from './JustForYouTutorial'

// TODO: revisit when the `kales_remove_cfy_collection` experiment is over
/*
const getBrowser = (userAgent) => {
  if (userAgent.indexOf('Edge') >= 0) {
    return 'Edge'
  }
  if (userAgent.indexOf('Trident') >= 0) {
    return 'IE'
  }

  return null
}
*/

// eslint-disable-next-line arrow-body-style, no-unused-vars
const showTutorial = (state) => {
  return false

  // TODO: revisit when the `kales_remove_cfy_collection` experiment is over
  //
  // There is ongoing experiment where we trialing new way of
  // representing Chosen For You (CFY) collection.
  // The CFY tutorial is not aware of new presentation.
  // Product ownership wants to disable the CFY tutorial experiment
  // for the entire customer base.
  // The reason why the "dead" code remains here (temporary):
  // to allow easy way of revert the experiment.
  /**
  const userAgentFromState = getUserAgent(state)
  const browser = getBrowser(userAgentFromState)
  const jfyPresent = state.tutorial && state.tutorial.getIn(['visible', 'justforyou'], false)

  if (browser === 'Edge' || browser === 'IE' || !jfyPresent) {
    return false
  }

  return true
   */
}

const mapStateToProps = (state) => ({
  showTutorial: showTutorial(state),
  collectionName: getRecommendationShortName(state) || 'Chosen For You'
})

const mapDispatchToProps = {
  incrementTutorialViewed,
  tutorialTracking
}

const JustForYouTutorialContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JustForYouTutorial)

export {
  JustForYouTutorialContainer,
}
