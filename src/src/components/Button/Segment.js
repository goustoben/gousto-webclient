import React from 'react'
import css from './Segment.css'
import classnames from 'classnames'

class Segment extends React.PureComponent {
	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.node,
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.element,
		]).isRequired,
		color: React.PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']),
		className: React.PropTypes.string,
		fill: React.PropTypes.bool,
		noHover: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		hover: React.PropTypes.func,
		disabledClick: React.PropTypes.func,
		disabled: React.PropTypes.bool,
		btnDisabled: React.PropTypes.bool,
		width: React.PropTypes.oneOf(['auto', 'full', 'no-auto']),
		size: React.PropTypes.string,
		spinner: React.PropTypes.bool,
		noDecoration: React.PropTypes.bool,
		'data-testing': React.PropTypes.string,
	}

	static defaultProps = {
		color: 'primary',
		className: '',
		disabled: false,
		btnDisabled: false,
		fill: true,
		width: 'auto',
		hover: () => {},
		onClick: undefined,
		disabledClick: undefined,
		size: '',
		spinner: false,
		noDecoration: false,
	}

	handleClick = (e) => {
		if (!this.props.btnDisabled && !this.props.disabled && this.props.onClick) {
			this.props.onClick(e)
		} else if (this.props.disabledClick) {
			this.props.disabledClick(e)
		}
	}

	handleKeyUp = (e) => {
		if (e.keyCode && (e.keyCode === 13 || e.keyCode === 32)) {
			this.handleClick(e)
		}
	}

	render() {
		const { color, btnDisabled, disabled, fill, hover, noHover, onClick, spinner } = this.props
		const isDisabled = btnDisabled || disabled
		const accessibility = spinner ? {} : { tabIndex: '0', role: 'button' }

		return (
			<div
				onClick={this.handleClick}
				onKeyUp={this.handleKeyUp}
				onMouseEnter={(isDisabled) ? hover : () => {}}
				onMouseLeave={(isDisabled) ? hover : () => {}}
				className={classnames(
					this.props.className,
					css.base,
					css[color],
					css[fill ? 'fill' : 'noFill'],
					{
						disabled: !onClick || isDisabled,
						[css.noHover]: !onClick || isDisabled || noHover,
						[css.autoWidthPadding]: (this.props.width === 'auto'),
						[css[this.props.size]]: this.props.size,
						[css.disabled]: isDisabled,
						[css.noDecor]: this.props.noDecoration,
					},
				)}
				data-testing={this.props['data-testing']}
				{ ...accessibility }
			>
				{this.props.children}
			</div>
		)
	}
}

export default Segment
