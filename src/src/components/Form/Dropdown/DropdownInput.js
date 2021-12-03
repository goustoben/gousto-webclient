import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import classNames from 'classnames'
import { restrictProps } from 'utils/restrictProps'
import { InputWrapper } from 'Form/InputWrapper'
// eslint-disable-next-line import/no-unresolved
import formsCss from 'styles/forms.module.css'
import css from './DropdownInput.module.css'
/*
Using require on the next line as there is an issue importing global styles
with our current configuration and ts-loader.
*/
// eslint-disable-next-line no-unused-vars
const globalReactCss = require('./reactSelect.module.css')

const propTypes = {
  additionalProps: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary']),
  value: PropTypes.any,
  subLabelClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  uppercase: PropTypes.bool,
  dataTesting: PropTypes.string,
  error: PropTypes.bool,
  isInCheckout: PropTypes.bool,
}

const defaultProps = {
  additionalProps: {},
  options: [],
  required: false,
  color: 'primary',
  uppercase: false,
  error: false,
  onOpen: () => { },
  onClose: () => { },
  isInCheckout: false,
  onChange: () => {},
  subLabelClassName: '',
  labelClassName: '',
  className: '',
  dataTesting: '',
}

export class DropdownInput extends React.Component {
  handleChange = (obj) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(JSON.parse(obj.value))
    }
  }

  nativeChanged = (e) => {
    this.handleChange(e.target)
  }

  mapToSelect = (options) => {
    const { labelClassName, subLabelClassName } = this.props

    return (
      options.map((option) => ({
        value: JSON.stringify(option.value),
        label: (
          <span className={classNames(labelClassName, (option.labelClassName) ? option.labelClassName : '', { [css.disabled]: option.disabled })}>
            {option.label}
            <span className={classNames(css.subLabel, css[subLabelClassName])}>
              {' '}
              {option.subLabel}
            </span>
            {option.icon ? <span className={css[`icon-${option.icon}`]} /> : null}
          </span>),
        disabled: option.disabled,
      }))
    )
  }

  mapToNative = (options) => (
    options.map(
      (option) => (
        <option key={JSON.stringify(option.value)} value={JSON.stringify(option.value)} disabled={option.disabled}>
          {option.label}
          {' '}
          {(typeof option.subLabel === 'string') ? option.subLabel : ''}
        </option>
      )
    )
  )

  renderNative = (options) => {
    const { error, uppercase, additionalProps, value, required, dataTesting, color, onOpen, onClose, isInCheckout } = this.props

    const className = classNames(css.native, {
      [css.primary]: !error && color === 'primary',
      [css.secondary]: !error && color === 'secondary',
      [formsCss.inputError]: error,
      [css.selectuppercase]: uppercase,
      [css.inCheckoutMobile]: isInCheckout && color === 'secondary',
    })

    return (
      <div>
        <select
          {...additionalProps}
          className={className}
          onChange={this.nativeChanged}
          onFocus={onOpen}
          onBlur={onClose}
          value={JSON.stringify(value)}
          required={required}
          data-testing={dataTesting}
        >
          {this.mapToNative(options)}
        </select>
        <span className={classNames(css.nativeSelectArrow, css[color])} />
      </div>
    )
  }

  getSelectProps = () => {
    const { onOpen } = this.props

    const defaultOptions = {
      clearable: false,
      searchable: false,
      placeholder: '',
      onMenuOpen: () => {
        onOpen()
      }
    }

    const ourProps = [
      'options',
      'onChange',
      'className',
      'value',
      'color',
      'defaultValue',
      'subLabelClassName',
      'error',
      'onMenuOpen',
      'onMenuClose',
      'onBlur'
    ]

    return restrictProps(this.props, ourProps, defaultOptions)
  }

  getValue = () => {
    const { options, value } = this.props
    if (!value) {
      return options[0]
    }

    return options ? options.find(option => option.value === value) : ''
  }

  renderSelect = (options) => {
    const { error, uppercase, additionalProps, dataTesting, color, onOpen, onClose, isInCheckout } = this.props

    const className = classNames(css.select, css.dropdown, {
      [css.primary]: !error && color === 'primary',
      [css.secondary]: !error && color === 'secondary',
      [css.error]: error,
      [css.selectuppercase]: uppercase,
      [css.inCheckoutDesktop]: isInCheckout && color === 'secondary',
    })

    return (
      <div data-testing={dataTesting}>
        <Select
          {...additionalProps}
          className={className}
          options={this.mapToSelect(options)}
          onChange={this.handleChange}
          onMenuOpen={onOpen}
          onMenuClose={onClose}
          value={this.getValue()}
          {...this.getSelectProps()}
          menuShouldScrollIntoView
        />
      </div>
    )
  }

  render = () => {
    const { options} = this.props
    const defaultOptions = []

    return (
      <div className={css.container}>
        <span className={css.mobileOnly}>
          {this.renderNative(options || defaultOptions)}
        </span>
        <span className={css.mobileHide}>
          {this.renderSelect(options || defaultOptions)}
        </span>
      </div>
    )
  }
}

DropdownInput.propTypes = propTypes
DropdownInput.defaultProps = defaultProps

export default InputWrapper(DropdownInput)
