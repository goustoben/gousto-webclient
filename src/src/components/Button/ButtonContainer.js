import React, { PropTypes } from 'react'
import Segment from 'Button/Segment'
import Tooltip from 'Tooltip'
import css from './ButtonContainer.css'
import classnames from 'classnames'
import Spinner from 'Spinner'

class Button extends React.PureComponent {
	static propTypes = {
		color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'negative']),
		disabled: PropTypes.bool,
		noDecoration: PropTypes.bool,
		className: PropTypes.string,
		width: PropTypes.oneOf(['auto', 'full', 'no-auto']),
		fill: PropTypes.bool,
		children: PropTypes.oneOfType([
			PropTypes.oneOf([
				PropTypes.instanceOf(Segment),
				PropTypes.instanceOf(Tooltip),
			]),
			PropTypes.arrayOf([
				PropTypes.instanceOf(Segment),
				PropTypes.instanceOf(Tooltip),
			]),
			PropTypes.node,
		]).isRequired,
		onClick: PropTypes.func,
		pending: PropTypes.bool,
		spinnerClassName: PropTypes.string,
		spinnerContainerClassName: PropTypes.string,
		'data-testing': PropTypes.string,
		/* indicates if the children should be always warpped in <Segment> (which has the
		 * (filling styles), no matter the type of the children */
		areChildrenInSegment: PropTypes.bool,
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
		areChildrenInSegment: false,
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

			if (typeof child === 'string' || props.areChildrenInSegment) {
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
		const { className, color, fill, disabled, pending, width, areChildrenInSegment } = this.props
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
					areChildrenInSegment,
					btnDisabled: disabled,
					'data-testing': this.props['data-testing'],
					noDecoration: this.props.noDecoration,
				})}
			</div>
		)
	}
}

export default Button
