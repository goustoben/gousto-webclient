import React from 'react'
import PropTypes from 'prop-types'

import Immutable from 'immutable'
import css from './HowItWorks.css'

const proptypes = {
  detailsSteps: PropTypes.instanceOf(Immutable.List)
}

const HowItWorksPresentation = ({detailsSteps}) => (
  <div className={css.howItWorks}>
  <div className={css.borderTop}></div>
  <h1>How It Works</h1>
  <div className={css.howItWorksWrapper}>
    {
      detailsSteps && detailsSteps.map((item, idx) => (
        <div className={css.howItWorksStep} key={`raf-how-it-works ${idx}`}>
          <div className={css.howItWorksStepIdx}><span>{idx+1}</span></div>
          {
            (idx === detailsSteps.size-1) ?
            <div className={css.howItWorksStepContent} dangerouslySetInnerHTML={{__html: item}} />
              :
            <div className={css.howItWorksStepContent}>{item}</div>
          }
        </div>)
      )
    }
  </div>
  </div>
)

HowItWorksPresentation.propTypes = proptypes

export { HowItWorksPresentation }
