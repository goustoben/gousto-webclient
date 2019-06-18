import { connect } from 'react-redux'

import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'

import { getUserAgent } from 'selectors/root'
import { getRecommendationShortName } from '../selectors/menu'
import { JustForYouTutorial } from './JustForYouTutorial'

const getBrowser = (userAgent) => {
  if(userAgent.indexOf('Edge') >= 0) {
    return 'Edge'
  }
  if (userAgent.indexOf('Trident') >= 0) {
    return 'IE'
  }
  
  return null
}

const showTutorial = (state) => {
  const userAgentFromState = getUserAgent(state)
  const browser = getBrowser(userAgentFromState)
  const jfyPresent = state.tutorial && state.tutorial.getIn(['visible', 'justforyou'], false)

  if (browser === 'Edge' || browser === 'IE' || !jfyPresent) {    
    return false
  }

  return true
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
