import React from 'react'
import PropTypes from 'prop-types'
import { ShortlistTutorial } from 'routes/Menu/ShortlistTutorial'
import classnames from 'classnames'
import css from './OpenBoxButton.css'

const OpenBoxButtonPresentation = ({ arrowUp, buttonText, shouldShowTutorialStep2, showTextOnButton }) => (
  <div className={css.iconMobile}>
    <div className={classnames({ [css.openButton]: showTextOnButton })}>
      {showTextOnButton &&
        <span className={css.openButtonText}>{buttonText.toUpperCase()}</span>
      }
      <span className={arrowUp ? css.arrowUp : css.arrowDown} data-slug="box-summary-mobile" />
    </div>
    {shouldShowTutorialStep2 && <ShortlistTutorial />}
  </div>
)

OpenBoxButtonPresentation.propTypes = {
  arrowUp: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  showTextOnButton: PropTypes.bool.isRequired,
  shouldShowTutorialStep2: PropTypes.bool.isRequired,
}

export { OpenBoxButtonPresentation }
