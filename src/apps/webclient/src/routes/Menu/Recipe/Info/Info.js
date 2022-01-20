import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import css from './Info.css'

const Info = ({ type = 'div', children, regular, ...props }) => {
  const className = classNames(
    css.container,
    { [css.regular]: regular },
  )

  return React.createElement(type, { className, ...props }, children)
}

Info.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  regular: PropTypes.bool,
}

Info.defaultProps = {
  regular: false,
}

export default Info
