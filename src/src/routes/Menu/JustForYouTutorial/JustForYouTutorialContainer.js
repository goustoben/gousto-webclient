import { connect } from 'react-redux'

import { incrementTutorialViewed } from 'actions/tutorial'

import { JustForYouTutorial } from './JustForYouTutorial'

const mapStateToProps = (state) => {
  console.log('TCL: mapStateToProps -> state.tutorial.getIn([visibile justforyou], false)', state.tutorial.getIn(['visible', 'justforyou'], false)) //eslint-disable-line
  
  return {
    showTutorial: state.tutorial && state.tutorial.getIn(['visible', 'justforyou'], false),
  }
}

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
