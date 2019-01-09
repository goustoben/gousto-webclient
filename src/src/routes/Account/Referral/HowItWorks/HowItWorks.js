import React from 'react'
import PropTypes from 'prop-types'
import { replaceLinkToTermsAndCondition } from 'utils/sanitizeText'
import css from './HowItWorks.css'
import { rafTermsLink } from '../config'

const HowItWorks = ({ details }) => {
  const sanitizeLastStep = replaceLinkToTermsAndCondition(details.last(), rafTermsLink)
  const detailsSteps = details.pop().push(sanitizeLastStep)

  return (
    <div className={css.howItWorks}>
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
}

HowItWorks.propTypes = {
  details: PropTypes.arrayOf(PropTypes.string),
}

export { HowItWorks }
