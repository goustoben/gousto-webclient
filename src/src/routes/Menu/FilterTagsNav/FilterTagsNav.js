import React, { PropTypes } from 'react'
import Button from 'Button'
import FilterTagsList from './FilterTagsList'
import css from './FilterTagsNav.css'

const FilterTagsNav = ({ onCTAClick, tags }) => (
	<div className={css.filterTagContainer}>
		<div className={css.filterListContainer}>
			<div className={css.filtersCTA}>
				<Button fill width="full" onClick={onCTAClick}>
					Filters
				</Button>
			</div>
			<FilterTagsList tags={tags} />
		</div>
	</div>
)

FilterTagsNav.propTypes = {
	onCTAClick: PropTypes.func,
	tags: PropTypes.arrayOf(PropTypes.string),
}

FilterTagsNav.defaultProps = {
	tags: [],
	onCTAClick: () => {},
}

export default FilterTagsNav
