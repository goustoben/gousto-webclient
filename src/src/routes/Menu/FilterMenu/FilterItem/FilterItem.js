import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './FilterItem.css'

const FilterItem = ({ children, value, type, groupName, checked, onClick }) => (
	<div className={classnames(css.filter, checked && css.checked)} onClick={onClick}>
		<label className={css.label}>{children}</label>
		<input className={type === 'radio' ? css.radio : css.checkbox} name={groupName} value={value} type={type} checked={checked} readOnly />
	</div>
)

FilterItem.propTypes = {
	value: PropTypes.string,
	children: PropTypes.node,
	type: PropTypes.string,
	groupName: PropTypes.string,
	checked: PropTypes.bool,
	onClick: PropTypes.func,
}

FilterItem.defaultProps = {
	groupName: null,
	checked: false,
}

export default FilterItem
