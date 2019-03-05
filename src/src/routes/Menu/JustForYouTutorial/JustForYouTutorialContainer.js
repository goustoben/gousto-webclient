import { connect } from 'react-redux'

import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'

import { JustForYouTutorial } from './JustForYouTutorial'

const mapStateToProps = (state) => ({
  showTutorial: state.tutorial && state.tutorial.getIn(['visible', 'justforyou'], false),
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
