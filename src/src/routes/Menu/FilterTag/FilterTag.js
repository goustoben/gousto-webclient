import PropTypes from 'prop-types'
import React from 'react'
import Icon from 'Icon'
import Svg from 'Svg'
import css from './FilterTag.css'

const proptypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  slug: PropTypes.string,
  isLoading: PropTypes.bool,
  collectionFilterChange: PropTypes.func,
  filterCurrentDietTypesChange: PropTypes.func,
  filterDietaryAttributesChange: PropTypes.func,
  filterCurrentTotalTimeChange: PropTypes.func,
}

const filterTagIcon = ({ slug = null, isLoading }) => {
  if (slug === 'recommendations') {
    if (isLoading) {
      return <Svg className={css.filterTagHeart} fileName="icon-heart-outline" />
    }

    return <Svg className={css.filterTagHeart} fileName="icon-heart" />
  }

  return null
}

const onFilterClick = ({
  type,
  value,
  collectionFilterChange,
  filterCurrentDietTypesChange,
  filterDietaryAttributesChange,
  filterCurrentTotalTimeChange
}) => {
  switch (type) {
  case 'collection':
    return collectionFilterChange(value)
  case 'dietType':
    return filterCurrentDietTypesChange(value)
  case 'dietaryAttribute':
    return filterDietaryAttributesChange(value)
  case 'totalTime':
    return filterCurrentTotalTimeChange(value)
  default:
    return null
  }
}
const FilterTag = (props) => (
	<div
	  className={css.filterTag}
	  onClick={() => onFilterClick(props)}
	>
		<span className={css.tagIcon}>
			<Icon name="fa-times" className={css.tagImageIcon} />
		</span>
		{props.text}
		{filterTagIcon(props)}
	</div>
)

FilterTag.propTypes = proptypes

export default FilterTag
