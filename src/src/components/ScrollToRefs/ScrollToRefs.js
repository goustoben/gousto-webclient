import React from 'react'
import * as domHelper from 'utils/DOMhelper'

export default class ScrollToRefs extends React.PureComponent {
	static propTypes = {
	  refKeys: React.PropTypes.array,
	  scrollToRef: React.PropTypes.bool,
	}

	static defaultProps = {
	  refKeys: [],
	  scrollToRef: false,
	  Component: null,
	}

	componentWillReceiveProps(nextProps) {
	  if (!this.props.scrollToRef && nextProps.scrollToRef) {
	    if (nextProps.refKeys.length) {
	      this.scrollToFirstMatchingRef(nextProps.refKeys)
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

export const scrollToRefsWrapper = Component => props => (
	<ScrollToRefs
	  {...props}
	  Component={Component}
	/>
)
