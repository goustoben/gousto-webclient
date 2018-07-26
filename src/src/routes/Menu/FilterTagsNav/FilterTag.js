import React, { PropTypes } from 'react'
import Icon from 'Icon'
import css from './FilterTag.css'

const FilterTag = ({ children }) => (
	<div className={css.filterTag}>
		<Icon name="fa-times" style={{ color: '#939596' }} />
		{children}
	</div>
)

FilterTag.propTypes = {
	children: PropTypes.node,
}

export default FilterTag
