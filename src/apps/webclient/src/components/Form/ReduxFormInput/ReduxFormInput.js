import PropTypes from 'prop-types'
import React from 'react'
import { touch } from 'redux-form'

// import Input from 'Form/Input'
import DropdownInput from 'Form/Dropdown'
import CheckBox from 'Form/CheckBox'

import InputError from 'Form/InputError'
import { Label } from 'Form/Label'
import {
  Text, Input, InputField, FontWeight, Space, Color, Select, SelectField, Checkbox
} from '@gousto-internal/citrus-react'
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

  getInputLabel() {
    const { label, subLabel } = this.props

    return (
      <>
        <Text fontWeight={FontWeight.Bold}>{label}</Text>
        {subLabel && (
          <>
            <Space size={3} />
            <Text size={1} color={Color.ColdGrey_600}>{subLabel}</Text>
          </>
        )}
      </>
    )
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

    if (inputType === 'Input') {
      let InputComponent
      if (label) {
        InputComponent = <InputField label={this.getInputLabel()} />
      } else {
        InputComponent = <Input />
      }

      return React.cloneElement(InputComponent, { ...inputProps,
        ...input,
        onChange: (e) => this.onChange(e.target.value),
        validationMessage: error && meta.error,
        status: error && 'Error',
        leftAccessory: inputPrefix,
        rightAccessory: inputSuffix,
        'data-testing': dataTesting,
      })
    }

    if (inputType === 'DropDown') {
      let SelectComponent
      if (label) {
        SelectComponent = <SelectField label={this.getInputLabel()} />
      } else {
        SelectComponent = <Select />
      }

      const selectOptions = inputProps.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)

      return React.cloneElement(SelectComponent, { ...inputProps,
        ...input,
        fullWdith: true,
        onChange: (e) => this.onChange(e.target.value),
        validationMessage: error && meta.error,
        status: error && 'Error',
        'data-testing': dataTesting,
      }, selectOptions)
    }

    // if (inputType === 'CheckBox') {
    //   return (
    //     <Checkbox
    //       onChange={(e) => this.onChange(e.target.checked)}
    //       data-testing={dataTesting}
    //       checked={!!input.value}
    //       status={error && 'Error'}
    //     >
    //       {inputProps.childLabel}
    //     </Checkbox>
    //   )
    // }

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
            {error && <InputError>{meta.error}</InputError>}
          </div>
        </div>
      </>
    )
  }
}

ReduxFormInput.propTypes = propTypes
ReduxFormInput.defaultProps = defaultProps
