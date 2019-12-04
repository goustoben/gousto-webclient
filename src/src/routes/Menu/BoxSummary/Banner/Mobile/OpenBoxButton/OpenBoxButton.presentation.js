import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './OpenBoxButton.css'

const OpenBoxButtonPresentation = ({ arrowUp, buttonText, showTextOnButton }) => (
  <div className={css.iconMobile}>
    <div className={classnames({ [css.openButton]: showTextOnButton })}>
      {showTextOnButton &&
        <span className={css.openButtonText}>{buttonText.toUpperCase()}</span>
      }
      <span className={arrowUp ? css.arrowUp : css.arrowDown} data-slug="box-summary-mobile" />
    </div>
  </div>
)

OpenBoxButtonPresentation.propTypes = {
  arrowUp: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  showTextOnButton: PropTypes.bool.isRequired,
}

export { OpenBoxButtonPresentation }
