import React, { PropTypes } from 'react'
import Icon from 'Icon'
import css from './FilterTag.css'

const FilterTag = ({ text, type, value, collectionFilterChange, filterCurrentDietTypesChange, filterDietaryAttributesChange, filterCurrentTotalTimeChange }) => (
	<div
		className={css.filterTag}
		onClick={() => {
			switch (type) {
				case 'collection':
					collectionFilterChange(value)
					break
				case 'dietType':
					filterCurrentDietTypesChange(value)
					break
				case 'dietaryAttribute':
					filterDietaryAttributesChange(value)
					break
				case 'totalTime':
					filterCurrentTotalTimeChange(value)
					break
				default:
					break
			}
		}}
	>
		<span className={css.tagIcon}>
			<Icon name="fa-times" className={css.tagImageIcon}/>
		</span>
		{text}
	</div>
)

FilterTag.propTypes = {
	text: PropTypes.string,
	action: PropTypes.func,
	value: PropTypes.string,
	collectionFilterChange: PropTypes.func,
	filterCurrentDietTypesChange: PropTypes.func,
	filterDietaryAttributesChange: PropTypes.func,
	filterCurrentTotalTimeChange: PropTypes.func,
}

export default FilterTag
