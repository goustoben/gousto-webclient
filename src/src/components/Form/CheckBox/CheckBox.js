import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import InputWrapper from 'Form/InputWrapper'
import css from './CheckBox.css'

export class CheckBox extends React.PureComponent {
  handleChange = (e) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(e.target.checked)
    }
  }

  render = () => {
    const {
      additionalProps,
      checked,
      className,
      'data-testing': dataTesting,
      disabled,
      label,
      labelClassName,
      name,
      required,
      style,
      textSize,
      childLabelClassName,
    } = this.props

    const labelElementClasses = classNames(
      {
        [labelClassName]: labelClassName,
        [css.label]: !labelClassName,
      },
      css[`textSize${textSize}`]
    )
    const spanElementClasses = classNames(
      css.container,
      {
        [css[style]]: style,
      }
    )
    const checkboxIndicatorClass = classNames(
      css.indicator,
      {
        [css.checked]: checked,
      }
    )
    const checkboxLabelTextClass = classNames(
      css.text,
      {
        [css.textChecked]: checked,
        [childLabelClassName]: childLabelClassName,
      }
    )

    return (
      <span className={spanElementClasses}>
        <label className={labelElementClasses}>
          <input
            {...additionalProps}
            className={classNames(css.input, className)}
            disabled={disabled}
            onChange={this.handleChange}
            required={required}
            type="checkbox"
            checked={checked}
            name={name}
            data-testing={dataTesting}
          />
          <span className={checkboxIndicatorClass} />
          <span className={checkboxLabelTextClass}>{label}</span>
        </label>
      </span>
    )
  }
}

CheckBox.propTypes = {
  additionalProps: PropTypes.object,
  checked: PropTypes.bool,
  className: PropTypes.string,
  'data-testing': PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  style: PropTypes.oneOf(['','disclaimer']),
  textSize: PropTypes.oneOf(['ExtraSmall', 'Medium']),
  childLabelClassName: PropTypes.string,
}

CheckBox.defaultProps = {
  additionalProps: {},
  checked: false,
  className: '',
  'data-testing': '',
  disabled: false,
  labelClassName: '',
  name: '',
  onChange: null,
  required: false,
  style: '',
  textSize: 'ExtraSmall',
  childLabelClassName: '',
}

export default InputWrapper(CheckBox)
