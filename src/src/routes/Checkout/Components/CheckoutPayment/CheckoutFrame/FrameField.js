import React from 'react'
import PropTypes from 'prop-types'
import InputError from 'Form/InputError'
import Svg from 'Svg'
import css from './CheckoutFrame.css'
import redesignCss from '../../../CheckoutRedesignContainer.css'

export const FrameField = ({
  header,
  hasLockIcon,
  dataFrames,
  errorDataTesting,
  errorMessage,
  showError,
}) => (
  <div className={css.fieldContainer}>
    <div className={redesignCss.fieldHeader}>{header}</div>
    <div className={hasLockIcon ? css.fieldWithIcon : null}>
      <div data-frames={dataFrames} className={css.iframeContainer} />
      {hasLockIcon && (
        <div className={css.lockIconContainer}>
          <Svg fileName="icon-checkout-lock" className={css.lockIcon} />
        </div>
      )}
    </div>
    <div data-testing={errorDataTesting}>
      {showError && <InputError isCheckoutOverhaulEnabled>{errorMessage}</InputError>}
    </div>
  </div>
)

FrameField.propTypes = {
  header: PropTypes.node.isRequired,
  hasLockIcon: PropTypes.bool,
  dataFrames: PropTypes.string.isRequired,
  errorDataTesting: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  showError: PropTypes.bool.isRequired,
}

FrameField.defaultProps = {
  hasLockIcon: false,
}
