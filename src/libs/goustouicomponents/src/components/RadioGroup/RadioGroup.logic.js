import React, { useState } from 'react'
import PropTypes from 'prop-types'

import css from './RadioGroup.module.css'

const propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  testingSelector: PropTypes.string,
  name: PropTypes.string,
}

const defaultProps = {
  testingSelector: null,
  name: null,
}

const RadioGroup = ({
  children,
  onChange,
  testingSelector,
  name,
}) => {
  const [statefulChildren, updateStatefulChildren] = useState(children)

  const handleRadioOnChange = (event) => {
    const newChildren = React.Children.map(
      children,
      (child) => React.cloneElement(child, {
        ...child.props,
        isChecked: child.props.value === event.target.value,
      }),
    )

    updateStatefulChildren(newChildren)
    onChange(event)
  }

  return (
    <div
      id={name}
      data-testing={testingSelector}
      onChange={handleRadioOnChange}
      className={css.radioGroup}
    >
      {statefulChildren}
    </div>
  )
}

RadioGroup.propTypes = propTypes
RadioGroup.defaultProps = defaultProps

export {
  RadioGroup,
}
