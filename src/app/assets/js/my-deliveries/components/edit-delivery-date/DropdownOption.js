import React, { PropTypes } from 'react'
import classnames from 'classnames'

const DropdownOption = (props) => {
	const classes = {
		[`${props.className}`]: props.className,
		disabled: props.disabled,
		hidden: props.hidden,
	}

	return (
		<li className={classnames(classes)}>
			<a onClick={(event) => (props.disabled ? null : props.onClick(event))}>
				{props.text}
				<span className="subtext">{props.subtext}</span>
				{props.disabled ? <span className="fa fa-truck"></span> : ''}
			</a>
		</li>
	)
}

DropdownOption.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
	onClick: PropTypes.func,
	text: PropTypes.string,
	subtext: PropTypes.string,
}

DropdownOption.defaultProps = {
	className: '',
	disabled: false,
	hidden: false,
	onClick: () => {},
	text: '',
	subtext: '',
}

export default DropdownOption
