import React from 'react'
import ReactDOM from 'react-dom'
import RCTooltip from 'rc-tooltip'
import classnames from 'classnames'
import './Tooltip.css'

class Tooltip extends React.PureComponent {
	static propTypes = {
		className: React.PropTypes.string,
		visible: React.PropTypes.bool,
		onVisibleChange: React.PropTypes.func,
		placement: React.PropTypes.string,
		style: React.PropTypes.oneOf(['button', 'checkbox']),
		triggers: React.PropTypes.oneOfType([
			React.PropTypes.oneOf(['click', 'hover', 'focus']),
			React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus'])),
		]),
		message: React.PropTypes.node.isRequired,
		children: React.PropTypes.node.isRequired,
		overlayClassName: React.PropTypes.string,
	}

	static defaultProps = {
		className: '',
		placement: 'top',
		visible: false,
		triggers: ['click', 'hover'],
	}

	constructor() {
		super()

		this.state = {
			segmentRect: null,
			align: {},
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible && nextProps.style === 'button') {
			this.setButtonStyleAlignment()
		}
	}

	setButtonStyleAlignment = () => {
		let align = {}

		const halfWidth = ReactDOM.findDOMNode(this.reference).getBoundingClientRect().width / 2
		const arrowOffset = 25
		const segPadding = 5
		const offsetY = 10
		const offsetX = Math.abs(halfWidth - (arrowOffset + segPadding))


		switch (this.props.placement) {
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

		this.setState({ align })
	}

	render() {
		const message = (typeof this.props.message === 'string') ? <div className={classnames(this.props.className, 'rc-tooltip-padding', 'rc-tooltip-message')}>{this.props.message}</div> : this.props.message

		return (
			<RCTooltip
				ref={(ref) => {
					if (ref) {
						this.reference = ref
					}
				}}
				overlay={message}
				overlayClassName={classnames({ [`rc-tooltip-style-${this.props.style}`]: this.props.style }, this.props.overlayClassName)}
				placement={this.props.placement}
				trigger={this.props.triggers}
				visible={this.props.visible}
				onVisibleChange={this.props.onVisibleChange}
				align={this.state.align}
			>
				{this.props.children}
			</RCTooltip>
		)
	}
}

export default Tooltip
