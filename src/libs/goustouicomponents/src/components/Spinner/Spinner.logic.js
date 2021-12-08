import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SpinnerPresentation } from './Spinner.presentation'
import css from './Spinner.module.css'

const propTypes = {
  color: PropTypes.oneOf(['black', 'white', 'bluecheese', 'radish']),
}

const defaultProps = {
  color: 'white',
}

const prepareChildren = (color) => {
  const circlesHtml = []
  for (let i = 1; i <= 12; i++) {
    circlesHtml.push(<div
      key={i}
      className={classnames(
        css[`circle${i}`], css[color],
      )}
    />)
  }

  return circlesHtml
}

const Spinner = ({ color }) => (

  <SpinnerPresentation>
    {prepareChildren(color)}
  </SpinnerPresentation>

)

Spinner.propTypes = propTypes

Spinner.defaultProps = defaultProps

export { Spinner }
