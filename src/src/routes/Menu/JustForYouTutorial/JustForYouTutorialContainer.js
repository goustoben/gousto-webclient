import { connect } from 'react-redux'

import { JustForYouTutorial } from './JustForYouTutorial'

const mapStateToProps = (state) => ({
  showTutorial: state.tutorial && state.tutorial.get('showJfyTutorial')
})

const JustForYouTutorialContainer = connect(mapStateToProps)(JustForYouTutorial)

export {
  JustForYouTutorialContainer,
}
