import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import * as domHelper from 'utils/DOMhelper'

const propTypes = {
  refKeys: PropTypes.array,
  scrollToRef: PropTypes.bool,
  Component: PropTypes.elementType
}

const defaultProps = {
  refKeys: [],
  scrollToRef: false,
  Component: null,
}

class ScrollToRefs extends PureComponent {
  componentDidUpdate(prevProps) {
    const { refKeys, scrollToRef } = this.props

    if (!prevProps.scrollToRef && scrollToRef) {
      if (refKeys.length) {
        this.scrollToFirstMatchingRef(refKeys)
      }
    }
  }

  storeRef = el => {
    const refId = el && el.props.refId

    if (refId) {
      this.refs = {
        ...this.refs,
        [refId]: el,
      }
    }
  }

  scrollToFirstMatchingRef = refKeys => {
    domHelper.scrollToFirstMatchingNode(refKeys, this.refs)
  }

  render() {
    const { Component, ...props } = this.props
    delete props.scrollToRef

    return Component ? (
      <Component
        {...props}
        receiveRef={this.storeRef}
        scrollToFirstMatchingRef={this.scrollToFirstMatchingRef}
      />
    ) : null
  }
}

ScrollToRefs.propTypes = propTypes

ScrollToRefs.defaultProps = defaultProps

export const scrollToRefsWrapper = Component => props => (
  <ScrollToRefs
    {...props}
    Component={Component}
  />
)
