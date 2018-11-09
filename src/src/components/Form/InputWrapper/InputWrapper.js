import React, { PropTypes } from 'react'

const InputWrapper = (Component, { childLabel, inputType, mask, ...rest } = {}) => {
  let additionalProps = {
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

InputWrapper.propTypes = {
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

export default Component => props => InputWrapper(Component, props)
