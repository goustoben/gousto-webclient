import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Item } from 'goustouicomponents'

class ItemExpandable extends PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
		trackClick: PropTypes.func,
		isHiddenOnMobile: PropTypes.bool,
	}

	static defaultProps = {
		trackClick: () => {},
		isHiddenOnMobile: false,
	}

	state = {
		isExpanded: false,
	}

	toggleContent() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}

	render() {
		const { label, trackClick, isHiddenOnMobile, children } = this.props
		const { isExpanded } = this.state

		return (
			<div onClick={() => this.toggleContent()}>
				<Item
					label={label}
					trackClick={trackClick}
					isHiddenOnMobile={isHiddenOnMobile}
					arrowExpanded={isExpanded}
				/>
				{isExpanded ? children : null}
			</div>
		)
	}
}


export {
	ItemExpandable
}
