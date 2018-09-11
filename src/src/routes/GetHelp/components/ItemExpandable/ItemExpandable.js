import React, { PropTypes, PureComponent } from 'react'
import classnames from 'classnames'

import css from './ItemExpandable.css'

export default class ItemExpandable extends PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
	}

	state = {
		isExpanded: false,
	}

	toggleContent() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}

	render() {
		const { label, children } = this.props
		const { isExpanded } = this.state
		const arrowClass = classnames({
			[css.itemArrowRight]: !isExpanded,
			[css.itemArrowDown]: isExpanded,
		})

		return (
			<div>
				<div className={css.itemContent} onClick={() => this.toggleContent()}>
					{label}
					<span className={classnames(arrowClass)} />
				</div>
				{isExpanded ? children : null}
			</div>
		)
	}
}
