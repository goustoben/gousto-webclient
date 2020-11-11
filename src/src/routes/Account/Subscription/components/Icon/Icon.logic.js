import React from 'react'
import PropTypes from 'prop-types'
import { iconNames } from './iconNames'
import css from './Icon.module.css'

const Icon = ({ name, testingSelector }) => (
  iconNames.includes(name)
    ? (
      <span
        className={css[name]}
        data-testing={testingSelector}
      />
    )
    : null
)

Icon.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired,
  testingSelector: PropTypes.string
}

Icon.defaultProps = {
  testingSelector: null
}

export { Icon }
