import PropTypes from 'prop-types'
import React from 'react'
import { touch } from 'redux-form'
import classNames from 'classnames'

import Input from 'Form/Input'
import DropdownInput from 'Form/Dropdown'
import CheckBox from 'Form/CheckBox'

import InputError from 'Form/InputError'
import Label from 'Form/Label'
import css from './ReduxFormInput.css'

class ReduxFormInput extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object.isRequired,
    inputType: PropTypes.oneOf(['CheckBox', 'DropDown', 'Input']).isRequired,
    inputPrefix: PropTypes.node,
    inputSuffix: PropTypes.node,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    dataTesting: PropTypes.string,
    'data-testing': PropTypes.string,
    className: PropTypes.string,
    isCheckoutOverhaulEnabled: PropTypes.bool,
    isPassStrengthEnabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onCustomPasswordBlur: PropTypes.func,
    isMobile: PropTypes.bool,
  }

  static defaultProps = {
    input: {},
    inputType: 'Input',
    label: '',
    subLabel: '',
    className: '',
    isCheckoutOverhaulEnabled: false,
    isPassStrengthEnabled: false,
    onFocus: () => {},
    onCustomPasswordBlur: () => {},
    isMobile: true,
  }

  debounceTouch(dispatch, formName, field) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }

    this.debounceTimeout = setTimeout(() => dispatch(touch(formName, field)), 1000)
  }

  onChange = (value) => {
    const { input, meta } = this.props
    if (value) {
      this.debounceTouch(meta.dispatch, meta.form, input.name)
    }

    input.onChange(value)
  }

  render() {
    const { inputPrefix, input, inputType, inputSuffix, label, meta, subLabel, isCheckoutOverhaulEnabled, isPassStrengthEnabled, onFocus, onCustomPasswordBlur, isMobile, ...inputProps } = this.props
    const dataTesting = this.props.dataTesting || this.props['data-testing']

    let Component
    switch (inputType) {
    case 'Input': {
      Component = Input
      break
    }
    case 'DropDown': {
      Component = DropdownInput
      break
    }
    case 'CheckBox': {
      Component = CheckBox
      break
    }
    default: {
      Component = Input
    }
    }

    const error = Boolean(meta && meta.touched && meta.error)

    const inputEl = React.createElement(Component, {
      ...inputProps,
      ...input,
      error,
      inputType,
      'data-testing': dataTesting,
      onChange: this.onChange,
      isCheckoutOverhaulEnabled,
      inputPrefix,
      isPassStrengthEnabled,
      ...(isPassStrengthEnabled && {
        passwordErrors: meta.error,
        [input.onFocus]: onFocus,
        onCustomPasswordBlur,
        isMobile,
      }),
    })

    return (
      <div>
        {label && <Label label={label} subLabel={subLabel} isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled} />}
        <div className={classNames(css.flexRow, { [css.passStrengthWrapper]: isPassStrengthEnabled && input.name === 'aboutyou.password' })}>
          {React.isValidElement(inputPrefix) && !isCheckoutOverhaulEnabled && inputPrefix}
          {inputEl && (
            <div className={css.flexItem}>
              {inputEl}
            </div>
          )}
          {React.isValidElement(inputSuffix) && inputSuffix}
        </div>
        <div data-testing={`${dataTesting}Error`}>
          {error && !isPassStrengthEnabled && <InputError isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{meta.error}</InputError>}
        </div>
      </div>
    )
  }
}

export default ReduxFormInput
