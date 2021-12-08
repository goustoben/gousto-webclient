import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Alert.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  hasIcon: PropTypes.bool,
  type: PropTypes.oneOf([
    'danger',
    'info',
    'success',
    'warning',
  ]),
}

const defaultProps = {
  type: 'info',
  hasIcon: true,
}

const Alert = ({ children, hasIcon, type }) => {
  const alertWrapperCss = classnames(
    css[type],
    { [css.hasIcon]: hasIcon },
  )

  return (
    <div className={alertWrapperCss}>
      {(hasIcon) && (
        <span className={css[`icon-${type}`]} />
      )}
      <div className={css.content}>{children}</div>
    </div>
  )
}

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps

export {
  Alert,
}
