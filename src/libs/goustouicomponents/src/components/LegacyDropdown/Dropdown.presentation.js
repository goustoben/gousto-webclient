import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  id: PropTypes.string.isRequired,
  optionSelected: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const DropdownPresentation = ({
  children, id, optionSelected, onChangeHandler,
}) => (
  <select // eslint-disable-line jsx-a11y/no-onchange
    id={id}
    value={optionSelected}
    onChange={(event) => { onChangeHandler(event.target.value) }}
  >
    {children}
  </select>
)

DropdownPresentation.propTypes = propTypes

export {
  DropdownPresentation,
}
