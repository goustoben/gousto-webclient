import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/products'
import CheckBox from 'Form/CheckBox'
import { Tooltip } from 'goustouicomponents'
import css from './AgeVerification.module.css'

const AgeVerificationCheckBox = ({ disabled, onCheckBoxChange, onTooltipVisibleChange, showError, tooltipVisible }) => (
  <div className={css.checkbox}>
    <Tooltip
      style="checkbox"
      message="Please tick this box if you want to proceed"
      onVisibleChange={onTooltipVisibleChange}
      placement="topLeft"
      triggers="click"
      visible={tooltipVisible}
    >
      <CheckBox
        label={`This item is age restricted, please confirm you’re over ${config.restrictedAge}`}
        disabled={disabled}
        onChange={onCheckBoxChange}
      />
    </Tooltip>
    {showError ? <div className={css.error}>Error verifying age</div> : ''}
  </div>
)

AgeVerificationCheckBox.propTypes = {
  disabled: PropTypes.bool,
  onCheckBoxChange: PropTypes.func,
  onTooltipVisibleChange: PropTypes.func,
  showError: PropTypes.bool,
  tooltipVisible: PropTypes.bool,
}

AgeVerificationCheckBox.defaultProps = {
  disabled: false,
  onCheckBoxChange: () => {},
  onTooltipVisibleChange: () => {},
  showError: false,
  tooltipVisible: false,
}

export { AgeVerificationCheckBox }
