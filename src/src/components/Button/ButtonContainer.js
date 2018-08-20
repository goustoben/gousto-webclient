import React from 'react'
import Segment from 'Button/Segment'
import Tooltip from 'Tooltip'
import css from './ButtonContainer.css'
import classnames from 'classnames'
import Spinner from 'Spinner'

class Button extends React.PureComponent {
	static propTypes = {
		color: React.PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']),
		disabled: React.PropTypes.bool,
		noDecoration: React.PropTypes.bool,
		className: React.PropTypes.string,
		width: React.PropTypes.oneOf(['auto', 'full']),
		fill: React.PropTypes.bool,
		children: React.PropTypes.oneOfType([
			React.PropTypes.oneOf([
				React.PropTypes.instanceOf(Segment),
				React.PropTypes.instanceOf(Tooltip),
			]),
			React.PropTypes.arrayOf([
				React.PropTypes.instanceOf(Segment),
				React.PropTypes.instanceOf(Tooltip),
			]),
			React.PropTypes.node,
		]).isRequired,
		onClick: React.PropTypes.func,
		pending: React.PropTypes.bool,
		spinnerClassName: React.PropTypes.string,
		spinnerContainerClassName: React.PropTypes.string,
		'data-testing': React.PropTypes.string,
	}

	static defaultProps = {
		color: 'primary',
		className: '',
		fill: true,
		width: 'auto',
		disabled: false,
		noDecoration: false,
		onClick: () => {},
		pending: false,
		spinnerClassName: '',
		spinnerContainerClassName: '',
	}

	cloneChildren = (children, props) => (
		React.Children.map(children, child => {
			if (child.type === Tooltip && child.props.children.type === Segment) {
				return (
					<Tooltip {...child.props}>
						{React.cloneElement(child.props.children, props)}
					</Tooltip>
				)
			}

			if (typeof child === 'string' || (child.props && child.props.inButtonSegment)) {
				return (
					<Segment
						{...props}
						fill={this.props.fill}
						onClick={this.props.onClick}
					>
						{child}
					</Segment>
				)
			}

			return (
				React.cloneElement(child, props)
			)
		})
	)

	render() {
		const { className, color, fill, disabled, pending, width } = this.props
		const classNames = {
			[className]: className,
			[css.disabled]: (disabled || pending),
			[css.widthAuto]: (width === 'auto'),
		}
		const spinnerClassNames = {
			[css.spinnerContainer]: true,
			[this.props.spinnerContainerClassName]: true,
			[css.spinnerShow]: pending,
		}

		return (
			<div
				key={React.Children.count(this.props.children)}
				className={classnames(
					css.container,
					css[color],
					css[fill ? 'fill' : 'noFill'],
					classNames,
				)}
			>
				<Segment spinner className={classnames(spinnerClassNames)} color={color}>
					<span className={classnames(css.spinner, this.props.spinnerClassName)}>
						<Spinner color={this.props.color === 'secondary' ? 'bluecheese' : 'white'} />
					</span>
				</Segment>
				{this.cloneChildren(this.props.children, {
					color,
					width,
					btnDisabled: disabled,
					'data-testing': this.props['data-testing'],
					noDecoration: this.props.noDecoration,
				})}
			</div>
		)
	}
}

export default Button
