import React from 'react'
import PropTypes from 'prop-types'
import RCTooltip from 'rc-tooltip'

const propTypes = {
  children: PropTypes.node.isRequired,
  kindOfCustomRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  overlay: PropTypes.node.isRequired,
  overlayClassName: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired,
  triggers: PropTypes.oneOfType([
    PropTypes.oneOf(['click', 'hover', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus'])),
  ]).isRequired,
  visible: PropTypes.bool.isRequired,
  onVisibleChange: PropTypes.func,
  align: PropTypes.shape().isRequired,
}

const defaultProps = {
  onVisibleChange: () => {},
  kindOfCustomRef: () => {},
}

const TooltipPresentation = ({
  children, kindOfCustomRef, overlay, overlayClassName, placement, triggers, visible, onVisibleChange, align,
}) => (
  <RCTooltip
    ref={kindOfCustomRef}
    overlay={overlay}
    overlayClassName={overlayClassName}
    placement={placement}
    trigger={triggers}
    visible={visible}
    onVisibleChange={onVisibleChange}
    align={align}
  >
    {children}
  </RCTooltip>
)

TooltipPresentation.propTypes = propTypes
TooltipPresentation.defaultProps = defaultProps

export {
  TooltipPresentation,
}
