import React, { PropTypes } from 'react'
import DropdownOption from './DropdownOption'

const Dropdown = (props) => (
	<div className={`${props.className} dropdown edit-delivery-dropdown`}>
		<button className="btn" disabled={props.disabled} type="button" data-toggle="dropdown">
			{props.btnText}
			<span className="glyphicon glyphicon-menu-down"></span>
		</button>
		<ul className="dropdown-menu">
			{props.options.map((option, key) =>
				<DropdownOption
					key={key}
					disabled={option.disabled}
					hidden={option.hidden}
					text={option.text}
					onClick={option.onClick}
					subtext={option.subtext}
				/>
			)}
		</ul>
	</div>
)

Dropdown.propTypes = {
	btnText: PropTypes.string,
	className: PropTypes.string,
	options: PropTypes.array,
	disabled: PropTypes.bool,
}

Dropdown.defaultProps = {
	btnText: '',
	options: [],
	disabled: false,
}

export default Dropdown
