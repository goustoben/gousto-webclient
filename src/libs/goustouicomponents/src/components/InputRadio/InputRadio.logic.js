import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './InputRadio.module.css'

const INPUT_VARIANTS = {
  default: 'default',
  tile: 'tile',
}

const propTypes = {
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  ariaLabel: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([INPUT_VARIANTS.tile, INPUT_VARIANTS.default]),
  onChange: PropTypes.func,
}

const defaultProps = {
  isDisabled: false,
  isChecked: false,
  variant: 'default',
  name: null,
  ariaLabel: null,
  onChange: null,
}

const InputRadio = ({
  children,
  id,
  isDisabled,
  name,
  value,
  variant,
  isChecked,
  onChange,
  ariaLabel,
}) => (
  <label
    className={classnames(
      css.inputRadioContainer,
      css[variant],
      { [css.checked]: isChecked },
      { [css.disabled]: isDisabled },
    )}
    htmlFor={id}
  >
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
      checked={isChecked}
      aria-label={ariaLabel}
    />
    <div className={css.inputRadioMask} />
    <div className={classnames(
      css.inputRadioLabel,
      { [css.inputRadioLabelChecked]: isChecked },
    )}
    >
      {children}
    </div>
  </label>
)

InputRadio.propTypes = propTypes
InputRadio.defaultProps = defaultProps

export {
  InputRadio,
}
