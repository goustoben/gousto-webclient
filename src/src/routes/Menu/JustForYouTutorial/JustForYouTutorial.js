import React from 'react'
import { PropTypes } from 'prop-types'

import { Portal } from 'Portal'
import { Tutorial, Step } from 'Tutorial'
import css from './JustForYouTutorial.css'

const JustForYouTutorial = ({ showTutorial, incrementTutorialViewed }) => (
  (showTutorial) ? (
    <Portal>
      <Tutorial onClose={() => { incrementTutorialViewed('justforyou') }}>
        <Step selector="[data-slug='recommendations']">
          <p className={css.intro}>Introducing</p>
          <p className={css.main}>Just For You</p>
          <p className={css.text}>We now show you a personalised selection of recipes we think you'll really enjoy</p>
        </Step>
        <Step selector="[data-slug='all-recipes']">
          <p className={css.text}>You can still browse all available recipes by clicking All Recipes.</p>
        </Step>
      </Tutorial>
    </Portal>
  ) : null
)

JustForYouTutorial.propTypes = {
  showTutorial: PropTypes.bool,
  incrementTutorialViewed: PropTypes.func,
}

JustForYouTutorial.defaultProps = {
  showTutorial: false,
  incrementTutorialViewed: () => {},
}

export {
  JustForYouTutorial
}
