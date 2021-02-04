import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import classNames from 'classnames'
import restrictProps from 'utils/restrictProps'
import InputWrapper from 'Form/InputWrapper'
// eslint-disable-next-line import/no-unresolved
import formsCss from 'styles/forms.css'
import globalCss from './reactSelect.css' // eslint-disable-line no-unused-vars
import css from './DropdownInput.css'

export class DropdownInput extends React.Component {
  static propTypes = {
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
    isCheckoutOverhaulEnabled: PropTypes.bool,
  }

  static defaultProps = {
    additionalProps: {},
    options: [],
    required: false,
    color: 'primary',
    uppercase: false,
    error: false,
    onOpen: () => { },
    onClose: () => { },
    isCheckoutOverhaulEnabled: false,
  }

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
    const { error, uppercase, additionalProps, value, required, dataTesting, color, onOpen, onClose, isCheckoutOverhaulEnabled } = this.props

    const className = classNames(css.native, {
      [css.primary]: !error && color === 'primary',
      [css.secondary]: !error && color === 'secondary',
      [formsCss.inputError]: error,
      [css.selectuppercase]: uppercase,
      [css.checkoutRedesign]: isCheckoutOverhaulEnabled && color === 'secondary',
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

    const defaultProps = {
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

    return restrictProps(this.props, ourProps, defaultProps)
  }

  getValue = () => {
    const { options, value } = this.props
    if (!value) {
      return options[0]
    }

    return options ? options.find(option => option.value === value) : ''
  }

  renderSelect = (options) => {
    const { error, uppercase, additionalProps, dataTesting, color, onOpen, onClose, isCheckoutOverhaulEnabled } = this.props

    const className = classNames(css.select, css.dropdown, {
      [css.primary]: !error && color === 'primary',
      [css.secondary]: !error && color === 'secondary',
      [css.error]: error,
      [css.selectuppercase]: uppercase,
      [css.checkoutDesktopRedesign]: isCheckoutOverhaulEnabled && color === 'secondary',
    })

    return (
      <div>
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
          data-testing={dataTesting}
        />
      </div>
    )
  }

  render = () => {
    const { options } = this.props
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

export default InputWrapper(DropdownInput)
