import PropTypes from 'prop-types'
import React from 'react'
import css from './FilterTag.css'

const proptypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  filterDietaryAttributesChange: PropTypes.func,
}

const changeFilter = (filterDietaryAttributesChange, value) => {
  filterDietaryAttributesChange(value)
  if (window.pageYOffset > 250) {
    window.scrollTo(0,240)
  }
}

const FilterTag = ({selected, value, text, filterDietaryAttributesChange}) => (
  <div
    className={selected ? css.selectedFilterTag : css.filterTag}
    onClick={() => changeFilter(filterDietaryAttributesChange, value)}
  >
    {selected ? 
      <span className={css.tagIcon}>
        <span className={css.tagImageIcon} />
      </span>
      : null
    }
    {text}
  </div>
)

FilterTag.propTypes = proptypes

export default FilterTag
