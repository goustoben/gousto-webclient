import { connect } from 'react-redux'
import { JustForYouTutorial } from './JustForYouTutorial'

const mapStateToProps = (state) => {
  return {
    showTutorial: state.tutorial.get('showJfyTutorial')
  }
}

const JustForYouTutorialContainer = connect(mapStateToProps, {})(JustForYouTutorial)

export default JustForYouTutorialContainer