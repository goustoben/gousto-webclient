import { connect } from 'react-redux'

import { incrementTutorialViewed } from 'actions/tutorial'

import { JustForYouTutorial } from './JustForYouTutorial'

const mapStateToProps = (state) => ({
  showTutorial: state.tutorial && state.tutorial.get('showJfyTutorial'),
  tutorialViewed: Boolean(state.tutorial && state.tutorial.getIn('viewed', 'justforyou')),
})

const mapDispatchToProps = {
  incrementTutorialViewed,
}

const JustForYouTutorialContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JustForYouTutorial)

export {
  JustForYouTutorialContainer,
}
