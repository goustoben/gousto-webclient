import React, { PropTypes } from 'react'
import { Button } from 'goustouicomponents'
import FilterTagsList from './FilterTagsList'
import css from './FilterTagsNav.css'

const FilterTagsNav = ({ onCTAClick, tags }) => (
	<div className={css.filterTagContainer}>
		<div className={css.filterListContainer}>
			<div className={css.filtersCTA}>
				<Button fill width="full" onClick={onCTAClick}>
					Filter by
				</Button>
			</div>
			<FilterTagsList tags={tags} />
		</div>
	</div>
)

FilterTagsNav.propTypes = {
	onCTAClick: PropTypes.func,
	tags: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string,
			type: PropTypes.string,
			value: PropTypes.string,
		}),
	),
}

FilterTagsNav.defaultProps = {
	tags: [],
	onCTAClick: () => {},
}

export default FilterTagsNav
