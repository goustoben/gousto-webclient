import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './InputCheck.module.css'

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['default', 'tile']),
  disabled: PropTypes.bool,
  testingSelector: PropTypes.string.isRequired,
}

const defaultProps = {
  isChecked: false,
  onChange: () => { },
  type: 'default',
  disabled: false,
}

const VARIANTS = ({ disabled, type }) => ({
  default: {
    classNames: {
      [css.disabled]: disabled,
    },
  },
  tile: {
    classNames: {
      [css.tile]: true,
      [css.disabled]: disabled,
    },
  },
}[type])

const InputCheckPresentation = ({
  id,
  label,
  isChecked,
  onChange,
  type,
  disabled,
  testingSelector,
}) => (
  <div
    data-testing={testingSelector}
    className={
      classnames(
        css.container,
        VARIANTS({ disabled, type }).classNames,
      )
    }
  >
    <label className={css.label} htmlFor={id}>
      <input
        id={id}
        data-testing={`${testingSelector}-input`}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className={classnames(css.checkboxBox, { [css.checkboxDisabled]: disabled })} />
      {label}
    </label>
  </div>
)

InputCheckPresentation.propTypes = propTypes
InputCheckPresentation.defaultProps = defaultProps

export {
  InputCheckPresentation,
}
