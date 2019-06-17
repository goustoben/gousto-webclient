import React from 'react'
import { PropTypes } from 'prop-types'

import { Portal } from 'Portal'
import { Tutorial, Step } from 'Tutorial'
import css from './JustForYouTutorial.css'

class JustForYouTutorial extends React.PureComponent {

  onCloseTutorial(step) {
    const { incrementTutorialViewed, tutorialTracking } = this.props
    const tutorialName = 'just_for_you'
    incrementTutorialViewed('justforyou')
    tutorialTracking(tutorialName, step, true)
  }

  trackStepViewed(step) {
    const { tutorialTracking } = this.props
    const tutorialName = 'just_for_you'
    tutorialTracking(tutorialName, step, false)
  }

  render() {
    const { showTutorial, collectionName } = this.props

    return (
      (showTutorial) ? (
        <Portal>
          <Tutorial onClose={(step) => this.onCloseTutorial(step)} trackStepViewed={(step) => this.trackStepViewed(step)}>
            <Step selector="[data-slug='recommendations']">
              <p className={css.intro}>Introducing</p>
              <p className={css.main}>{collectionName}</p>
              <p className={css.text}>{"We now show you a personalised selection of recipes we think you\u0027ll really enjoy"}</p>
            </Step>
            <Step selector="[data-slug='all-recipes']">
              <p className={css.text}>You can still browse all available recipes by clicking All Recipes.</p>
            </Step>
          </Tutorial>
        </Portal>
      ) : null
    )
  }
}

JustForYouTutorial.propTypes = {
  showTutorial: PropTypes.bool,
  incrementTutorialViewed: PropTypes.func,
  tutorialTracking: PropTypes.func,
  collectionName: PropTypes.string.isRequired,
}

JustForYouTutorial.defaultProps = {
  showTutorial: false,
  incrementTutorialViewed: () => { },
  tutorialTracking: () => { },
  collectionName: 'Just For You'
}

export {
  JustForYouTutorial
}
