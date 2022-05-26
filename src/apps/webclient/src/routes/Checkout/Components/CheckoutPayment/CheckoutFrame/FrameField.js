import React from 'react'

import InputError from 'Form/InputError'
import Svg from 'Svg'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import checkoutCss from '../../../Checkout.css'
import css from './CheckoutFrame.css'

export const FrameField = ({
  header,
  hasLockIcon,
  dataFrames,
  errorDataTesting,
  errorMessage,
  showError,
}) => (
  <div className={css.fieldContainer}>
    <div className={checkoutCss.fieldHeader}>{header}</div>
    <div className={hasLockIcon ? css.fieldWithIcon : null}>
      <div
        data-frames={dataFrames}
        className={classNames(css.iframeContainer, 'frame--activated', {
          'frame--invalid': showError,
        })}
      />
      {hasLockIcon && (
        <div className={css.lockIconContainer}>
          <Svg fileName="icon-checkout-lock" className={css.lockIcon} />
        </div>
      )}
    </div>
    <div data-testing={errorDataTesting}>
      {showError && <InputError>{errorMessage}</InputError>}
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
