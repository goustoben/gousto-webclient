import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DropdownPresentation } from './Dropdown.presentation'

import css from './Dropdown.module.css'

const propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  optionSelected: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({
    groupLabel: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
}

const defaultProps = {
  onChange: () => { },
}

const sortGroupedOptionListByLabel = (groupedOptions) => {
  const groupedOptionList = {}

  groupedOptions.forEach((groupedOption) => {
    const { groupLabel } = groupedOption

    if (groupedOptionList[groupLabel]) {
      groupedOptionList[groupLabel].push(groupedOption)
    } else {
      groupedOptionList[groupLabel] = [groupedOption]
    }
  })

  return groupedOptionList
}

const renderOption = (id, label, disabled = false) => {
  const optionClass = (disabled)
    ? 'groupOptionItem'
    : 'optionItem'

  return (
    <option key={id} value={id} disabled={disabled} className={optionClass}>
      {label}
    </option>
  )
}

const renderOptionGroup = (groupList) => {
  const groupedOptionsRendered = []

  Object.keys(groupList).forEach((key, index) => {
    const groupOfOptions = groupList[key]
    const { groupLabel } = groupOfOptions[0]

    const groupOptionLabel = renderOption(`${groupLabel}-${index}`, groupLabel, true)
    groupedOptionsRendered.push(groupOptionLabel)

    const group = (
      groupOfOptions.map((option) => renderOption(option.id, option.label))
    )

    groupedOptionsRendered.push(group)
  })

  return groupedOptionsRendered
}

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    const { groupedOptions } = this.props

    this.groupedOptionList = sortGroupedOptionListByLabel(groupedOptions)

    this.state = {
      optionSelected: props.optionSelected,
    }
  }

  onChangeHandler = (optionSelected) => {
    const { onChange } = this.props
    const currentState = this.state

    this.setState({
      ...currentState,
      optionSelected,
    })

    onChange(optionSelected)
  }

  render() {
    const { id, options } = this.props
    const { optionSelected } = this.state
    const renderedOptions = options.map((option) => (renderOption(option.id, option.label)))
    const renderedOptionGroups = renderOptionGroup(this.groupedOptionList)

    return (
      <div className={css.dropdownContainer}>
        <DropdownPresentation
          id={id}
          optionSelected={optionSelected}
          onChangeHandler={this.onChangeHandler}
        >
          {renderedOptions}
          {renderedOptionGroups}
        </DropdownPresentation>
        <span className={css.arrowDown} />
      </div>

    )
  }
}

Dropdown.propTypes = propTypes
Dropdown.defaultProps = defaultProps

export {
  Dropdown,
}
