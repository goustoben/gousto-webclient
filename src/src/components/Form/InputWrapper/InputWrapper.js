import PropTypes from 'prop-types'
import React from 'react'

const InputWrapperUnconnected = (Component, { childLabel, inputType, mask, ...rest } = {}) => {
  const additionalProps = {
    'data-hj-masked': mask,
  }

  let props = { ...rest }

  if (inputType === 'CheckBox') {
    props = {
      ...props,
      checked: !!props.value,
      label: childLabel,
    }
  }

  return (
    <Component
      {...props}
      additionalProps={additionalProps}
    />
  )
}

InputWrapperUnconnected.propTypes = {
  childLabel: PropTypes.string,
  mask: PropTypes.object,
  inputType: PropTypes.oneOf([
    'CheckBox',
    'DropDown',
    'Input',
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
}

InputWrapperUnconnected.defaultProps = {
  childLabel: null,
  mask: null,
  value: null,
}

export const InputWrapper = Component => props => InputWrapperUnconnected(Component, props)
