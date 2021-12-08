import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { TooltipPresentation } from './Tooltip.presentation'
import './Tooltip.module.css'

const getMessage = (message, className) => (
  (typeof message === 'string') ? (
    <div className={classnames(
      className, 'rc-tooltip-padding', 'rc-tooltip-message',
    )}
    >
      {message}
    </div>
  ) : message
)

const getButtonStyleAlignment = (node, placement) => {
  let align = {}

  const halfWidth = node && node.getBoundingClientRect().width / 2
  const arrowOffset = 25
  const segPadding = 5
  const offsetY = 10
  const offsetX = Math.abs(halfWidth - (arrowOffset + segPadding))

  switch (placement) {
    case 'topRight':
      if (halfWidth > arrowOffset) {
        align = { offset: [-offsetX, -offsetY] }
      } else {
        align = { offset: [offsetX, -offsetY] }
      }
      break
    case 'topLeft':
      if (halfWidth > arrowOffset) {
        align = { offset: [offsetX, offsetY] }
      } else {
        align = { offset: [-offsetX, offsetY] }
      }
      break
    case 'bottomRight':
      if (halfWidth > arrowOffset) {
        align = { offset: [-offsetX, offsetY] }
      } else {
        align = { offset: [offsetX, offsetY] }
      }
      break
    case 'bottomLeft':
      if (halfWidth > arrowOffset) {
        align = { offset: [offsetX, offsetY] }
      } else {
        align = { offset: [-offsetX, offsetY] }
      }
      break
    default:
      align = {}
      break
  }

  return align
}

const propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  placement: PropTypes.string,
  style: PropTypes.oneOf(['button', 'checkbox']),
  triggers: PropTypes.oneOfType([
    PropTypes.oneOf(['click', 'hover', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus'])),
  ]),
  message: PropTypes.node,
  children: PropTypes.node.isRequired,
  overlayClassName: PropTypes.string,
}

const defaultProps = {
  className: '',
  message: null,
  onVisibleChange: () => {},
  overlayClassName: null,
  placement: 'top',
  style: 'button',
  visible: false,
  triggers: ['click', 'hover'],
}

class Tooltip extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      align: {},
    }
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line react/no-deprecated
    if (nextProps.visible && nextProps.style === 'button') {
      const align = getButtonStyleAlignment(this.node, nextProps.placement)
      this.setState({ align })
    }
  }

  render() {
    const {
      children,
      className,
      onVisibleChange,
      overlayClassName,
      message,
      placement,
      style,
      triggers,
      visible,
    } = this.props
    const formattedMessage = getMessage(message, className)
    const { align } = this.state

    return (
      <TooltipPresentation
        kindOfCustomRef={(ref) => {
          if (ref) {
            this.ref = ref
          }
        }}
        overlay={formattedMessage}
        overlayClassName={classnames(
          { [`rc-tooltip-style-${style}`]: style }, overlayClassName,
        )}
        placement={placement}
        triggers={triggers}
        visible={visible}
        onVisibleChange={onVisibleChange}
        align={align}
      >
        {children}
      </TooltipPresentation>
    )
  }
}

Tooltip.defaultProps = defaultProps
Tooltip.propTypes = propTypes

export {
  Tooltip,
}
