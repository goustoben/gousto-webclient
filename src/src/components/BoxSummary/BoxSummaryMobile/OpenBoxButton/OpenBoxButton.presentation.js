import React from 'react'
import { PropTypes } from 'prop-types'
import { ShortlistTutorial } from 'routes/Menu/ShortlistTutorial'
import classnames from 'classnames'
import css from '../BoxSummaryMobile.css'

const OpenBoxButtonPresentation = ({ iconClass, buttonText, shouldShowTutorialStep2, showTextOnButton }) => (
  <div className={css.iconMobile}>
    <div className={classnames({ [css.openButton]: showTextOnButton })}>
      {showTextOnButton &&
        <span className={css.openButtonText}>{buttonText.toUpperCase()}</span>
      }
      <span className={iconClass} data-slug="box-summary-mobile" />
      {shouldShowTutorialStep2 && <ShortlistTutorial />}
    </div>
  </div>
)

OpenBoxButtonPresentation.propTypes = {
  iconClass: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  showTextOnButton: PropTypes.bool.isRequired,
  shouldShowTutorialStep2: PropTypes.bool.isRequired,
}

export { OpenBoxButtonPresentation }
