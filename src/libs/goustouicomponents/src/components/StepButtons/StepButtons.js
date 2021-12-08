import PropTypes from 'prop-types'
import React from 'react'
import { CTA } from '../CTA'
import css from './StepButton.module.css'

const propTypes = {
  isContinueDisabled: PropTypes.bool,
  isSkipButtonVisible: PropTypes.bool,
  labelNext: PropTypes.string.isRequired,
  labelSkip: PropTypes.string.isRequired,
  onContinueClick: PropTypes.func.isRequired,
  onSkipClick: PropTypes.func.isRequired,
}

const defaultProps = {
  isContinueDisabled: false,
  isSkipButtonVisible: true,
}

const StepButtons = ({
  isContinueDisabled,
  isSkipButtonVisible,
  labelNext,
  labelSkip,
  onContinueClick,
  onSkipClick,
}) => (
  (
    <div className={css.container}>
      <div className={css.buttonContinue}>
        <CTA
          isFullWidth
          onClick={onContinueClick}
          size="medium"
          variant="primary"
          isDisabled={isContinueDisabled}
        >
          {labelNext}
        </CTA>
      </div>
      {isSkipButtonVisible && (
        <div>
          <CTA
            isFullWidth
            onClick={onSkipClick}
            size="medium"
            variant="secondary"
          >
            {labelSkip}
          </CTA>
        </div>
      )}
    </div>
  )
)

StepButtons.defaultProps = defaultProps
StepButtons.propTypes = propTypes

export { StepButtons }
