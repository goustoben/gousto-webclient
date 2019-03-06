import { connect } from 'react-redux'

import { incrementTutorialViewed } from 'actions/tutorial'

import { JustForYouTutorial } from './JustForYouTutorial'

const mapStateToProps = (state) => ({
  showTutorial: state.tutorial && state.tutorial.getIn(['visible', 'justforyou'], false),
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
