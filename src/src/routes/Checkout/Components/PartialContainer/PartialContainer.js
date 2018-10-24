import React from 'react'
import css from './Partial.css'

class PartialContainer extends React.PureComponent {
	static propTypes = {
		visible: React.PropTypes.bool,
		children: React.PropTypes.node,
	}

	render() {
		return (
			<div className={css.container}>
				{this.props.visible && this.props.children}
			</div>
		)
	}
}

export default PartialContainer
