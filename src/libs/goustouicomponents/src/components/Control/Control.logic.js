import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import css from './Control.module.css'
import { ControlPresentation } from './Control.presentation'

const propTypes = {
  children: PropTypes.node,
  placement: PropTypes.oneOf(['left', 'right']),
}

const defaultProps = {
  children: null,
  placement: 'right',
}

const Control = ({ children, placement }) => {
  const className = classnames(
    css.control,
    {
      [css.left]: placement === 'left',
      [css.right]: placement === 'right',
    },
  )

  return (
    <ControlPresentation className={className}>
      {children}
    </ControlPresentation>
  )
}

Control.defaultProps = defaultProps
Control.propTypes = propTypes

export { Control }
