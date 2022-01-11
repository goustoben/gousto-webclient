import PropTypes from 'prop-types'
import React from 'react'
import { touch } from 'redux-form'

import Input from 'Form/Input'
import DropdownInput from 'Form/Dropdown'
import CheckBox from 'Form/CheckBox'
import { InputField, Checkbox } from '@gousto-internal/citrus-react'

import InputError from 'Form/InputError'
import { Label } from 'Form/Label'
import css from './ReduxFormInput.css'

const propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object.isRequired,
  inputType: PropTypes.oneOf(['CheckBox', 'DropDown', 'Input']).isRequired,
  inputPrefix: PropTypes.node,
  inputSuffix: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dataTesting: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
}

const defaultProps = {
  input: {},
  label: '',
  subLabel: '',
  className: '',
  onFocus: () => {},
  inputPrefix: null,
  inputSuffix: null,
  dataTesting: null,
}

export class ReduxFormInput extends React.PureComponent {
  onChange = (value) => {
    const { input, meta } = this.props
    if (value) {
      this.debounceTouch(meta.dispatch, meta.form, input.name)
    }

    input.onChange(value)
  }

  debounceTouch(dispatch, formName, field) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }

    this.debounceTimeout = setTimeout(() => dispatch(touch(formName, field)), 1000)
  }

  render() {
    const { inputPrefix, input, inputType, inputSuffix, label, meta, subLabel, onFocus, dataTesting, ...inputProps } = this.props
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
      dataTesting,
      onChange: this.onChange,
      isInCheckout: true,
      inputPrefix,
      [input.onFocus]: onFocus,
    })

    return (
      <>
        {Component === Input && (
        <InputField
          {...inputProps}
          {...input}
          label={label}
          onChange={(e) => this.onChange(e.target.value)}
          validationMessage={error && meta.error}
          status={error && 'Error'}
          isInCheckout
          data-testing={dataTesting}
        />
        )}

        {Component === CheckBox && (
        <Checkbox
          onChange={(e) => this.onChange(e.target.checked)}
          isInCheckout
          data-testing={dataTesting}
          checked={!!input.value}
        >
          {inputProps.childLabel}
        </Checkbox>
        )}

        {Component !== CheckBox && Component !== Input && (
        <div>
          {label && <Label label={label} subLabel={subLabel} />}
          <div className={css.flexRow}>
            {inputEl && (
            <div className={css.flexItem}>
              {inputEl}
            </div>
            )}
            {React.isValidElement(inputSuffix) && inputSuffix}
          </div>
          <div data-testing={`${dataTesting}Error`}>
            {error && (
            <InputError>
              {meta.error}
            </InputError>
            )}
          </div>
        </div>
        )}
      </>
    )
  }
}

ReduxFormInput.propTypes = propTypes
ReduxFormInput.defaultProps = defaultProps
