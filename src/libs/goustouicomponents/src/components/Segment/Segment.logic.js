import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SegmentPresentation } from './Segment.presentation'
import css from './Segment.module.css'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'negative']),
  className: PropTypes.string,
  fill: PropTypes.bool,
  noHover: PropTypes.bool,
  onClick: PropTypes.func,
  hover: PropTypes.func,
  disabledClick: PropTypes.func,
  disabled: PropTypes.bool,
  btnDisabled: PropTypes.bool,
  width: PropTypes.oneOf(['auto', 'full']),
  size: PropTypes.string,
  spinner: PropTypes.bool,
  noDecoration: PropTypes.bool,
  'data-testing': PropTypes.string,
}

const defaultProps = {
  color: 'primary',
  className: '',
  'data-testing': null,
  disabled: false,
  btnDisabled: false,
  fill: true,
  width: 'auto',
  hover: () => {},
  onClick: undefined,
  disabledClick: undefined,
  size: '',
  spinner: false,
  noDecoration: false,
  noHover: false,
}

const Segment = ({
  children, color, className, fill, noHover, onClick, hover, disabledClick, disabled, btnDisabled, width, size, spinner, noDecoration, 'data-testing': dataTesting,
}) => {
  const handleClick = (e) => {
    if (!btnDisabled && !disabled && onClick) {
      onClick(e)
    } else if (disabledClick) {
      disabledClick(e)
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode && (e.keyCode === 13 || e.keyCode === 32)) {
      handleClick(e)
    }
  }

  const isDisabled = btnDisabled || disabled
  const accessibility = spinner ? {} : { tabIndex: '0', role: 'button' }
  const composedClass = classnames(
    className,
    css.base,
    css[color],
    css[fill ? 'fill' : 'noFill'],
    {
      disabled: !onClick || isDisabled,
      [css.noHover]: !onClick || isDisabled || noHover,
      [css.autoWidthPadding]: (width === 'auto'),
      [css[size]]: size,
      [css.disabled]: isDisabled,
      [css.noDecor]: noDecoration,
    },
  )

  const onMouseEnter = (isDisabled) ? hover : () => {}
  const onMouseLeave = (isDisabled) ? hover : () => {}

  return (
    <SegmentPresentation
      onClick={() => handleClick}
      onKeyUp={() => handleKeyUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={composedClass}
      data-testing={dataTesting}
      accessibility={accessibility}
    >
      {children}
    </SegmentPresentation>
  )
}

Segment.propTypes = propTypes
Segment.defaultProps = defaultProps

export { Segment }
