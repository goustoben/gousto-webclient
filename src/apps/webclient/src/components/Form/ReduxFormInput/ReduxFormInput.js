import PropTypes from 'prop-types'
import React from 'react'
import { touch } from 'redux-form'

import {
  Text, Input, InputField, FontWeight, Space, Color, Select, SelectField, Checkbox, FlexDirection, Box, Icon, IconVariant, AlignItems
} from '@gousto-internal/citrus-react'

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

  getFormattedLabel() {
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
    const { inputPrefix, input, inputType, inputSuffix, label, meta, dataTesting, onFocus, ...inputProps } = this.props

    const error = Boolean(meta && meta.touched && meta.error)

    if (inputType === 'DropDown') {
      let SelectComponent
      if (label) {
        SelectComponent = <SelectField label={this.getFormattedLabel()} />
      } else {
        SelectComponent = <Select />
      }

      const selectOptions = inputProps.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)

      const SelectComponentWithProps = React.cloneElement(SelectComponent, { ...inputProps,
        ...input,
        onFocus,
        fullWdith: true,
        onChange: (e) => this.onChange(e.target.value),
        validationMessage: error && meta.error,
        status: error && 'Error',
        'data-testing': dataTesting,
      }, selectOptions)

      return (
        <>
          {SelectComponentWithProps}
          {!label && error && (
            <>
              <Space size={2} />
              <Box display="flex" flexDirection={FlexDirection.Row} alignItems={AlignItems.FlexEnd}>
                <Icon name="error" variant={IconVariant.Error} />
                <Space size={1} direction="horizontal" />
                <Text size={1} color={Color.Error_900} vaiant={}>{meta.error}</Text>
              </Box>
            </>
          )}
        </>
      )
    } else if (inputType === 'CheckBox') {
      return (
        <Checkbox
          onChange={(e) => this.onChange(e.target.checked)}
          onFocus={onFocus}
          data-testing={dataTesting}
          checked={!!input.value}
          status={error && 'Error'}
        >
          {inputProps.childLabel}
        </Checkbox>
      )
    } else {
      let InputComponent
      if (label) {
        InputComponent = <InputField label={this.getFormattedLabel()} />
      } else {
        InputComponent = <Input />
      }

      const InputComponentWithProps = React.cloneElement(InputComponent, { ...inputProps,
        ...input,
        onFocus,
        onChange: (e) => this.onChange(e.target.value),
        validationMessage: error && meta.error,
        status: error && 'Error',
        leftAccessory: inputPrefix,
        rightAccessory: inputSuffix,
        'data-testing': dataTesting,
      })

      return (
        <>
          {InputComponentWithProps}
          {!label && error && (
            <>
              <Space size={2} />
              <Text size={1} color={Color.Error_900}>{meta.error}</Text>
            </>
          )}
        </>
      )
    }
  }
}

ReduxFormInput.propTypes = propTypes
ReduxFormInput.defaultProps = defaultProps
