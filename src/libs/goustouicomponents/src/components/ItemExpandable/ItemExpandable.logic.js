import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ItemExpandablePresentation } from './ItemExpandable.presentation'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
  ]).isRequired,
  isHiddenOnMobile: PropTypes.bool,
  isLabelHeading: PropTypes.bool,
  label: PropTypes.string.isRequired,
  trackClick: PropTypes.func,
}

const defaultProps = {
  isHiddenOnMobile: false,
  isLabelHeading: false,
  trackClick: () => {},
}

class ItemExpandable extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
    }
  }

  toggleContent = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }))
  }

  render() {
    const {
      children, isHiddenOnMobile, label, trackClick, isLabelHeading,
    } = this.props
    const { isExpanded } = this.state
    const currentChildren = isExpanded ? children : null

    return (
      <ItemExpandablePresentation
        canExpand
        isExpanded={isExpanded}
        isHiddenOnMobile={isHiddenOnMobile}
        label={label}
        isLabelHeading={isLabelHeading}
        trackClick={trackClick}
        onClick={this.toggleContent}
      >
        {currentChildren}
      </ItemExpandablePresentation>
    )
  }
}

ItemExpandable.propTypes = propTypes
ItemExpandable.defaultProps = defaultProps

export {
  ItemExpandable,
}
