import React from 'react'
import PropTypes from 'prop-types'

import { Item } from '../Item'

const propTypes = {
  canExpand: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
  ]),
  isExpanded: PropTypes.bool.isRequired,
  isHiddenOnMobile: PropTypes.bool,
  isLabelHeading: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  trackClick: PropTypes.func,
}

const defaultProps = {
  children: null,
  isHiddenOnMobile: false,
  isLabelHeading: false,
  trackClick: () => {},
}

const ItemExpandablePresentation = ({
  canExpand,
  children,
  isExpanded,
  isHiddenOnMobile,
  label,
  isLabelHeading,
  onClick,
  trackClick,
}) => (
  <div>
    <Item
      canExpand={canExpand}
      isExpanded={isExpanded}
      isHiddenOnMobile={isHiddenOnMobile}
      label={label}
      isLabelHeading={isLabelHeading}
      onClick={onClick}
      trackClick={trackClick}
    />
    {children}
  </div>
)

ItemExpandablePresentation.propTypes = propTypes
ItemExpandablePresentation.defaultProps = defaultProps

export {
  ItemExpandablePresentation,
}
