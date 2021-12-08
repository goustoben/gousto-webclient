import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './CloseIcon.module.css'
import { CloseIconPresentation } from './CloseIcon.presentation'

const POSITION_CLASSES = {
  'top-left': css.button,
  'top-right': css['top-right'],
}

const DEFAULT_CLASS = POSITION_CLASSES['top-left']

const propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.oneOf(Object.keys(POSITION_CLASSES)),
}

const defaultProps = {
  position: 'top-left',
}

const getClassName = (position) => classnames(
  DEFAULT_CLASS,
  {
    [POSITION_CLASSES[position]]: POSITION_CLASSES[position] && POSITION_CLASSES[position] !== DEFAULT_CLASS,
  },
)

const CloseIcon = ({ onClick, position }) => (
  <CloseIconPresentation
    className={getClassName(position)}
    onClick={onClick}
  />
)

CloseIcon.propTypes = propTypes
CloseIcon.defaultProps = defaultProps

export {
  CloseIcon,
}
