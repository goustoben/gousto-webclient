import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './FilterTagsList.css'
import FilterTag from './FilterTag'

const FilterTagList = ({ tags }) => (
	<div className={classnames(css.filterTagList, { [css.divider]: tags.length > 0 })}>
		{tags.map(tag => <FilterTag>{tag}</FilterTag>)}
	</div>
)

FilterTagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string),
}

FilterTagList.defaultProps = {
	tags: [],
}

export default FilterTagList
