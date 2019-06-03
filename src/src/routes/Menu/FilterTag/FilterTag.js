import PropTypes from 'prop-types'
import React from 'react'
import css from './FilterTag.css'

const proptypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  filterDietaryAttributesChange: PropTypes.func,
  browser: PropTypes.string,
}

const changeFilter = (filterDietaryAttributesChange, value, browser) => {
  const scrollDepth = (browser === 'mobile') ? 250 : 346
  filterDietaryAttributesChange(value)
  if (window.pageYOffset > 255) {
    window.scrollTo(0,scrollDepth)
  }
}

const FilterTag = ({selected, value, text, filterDietaryAttributesChange, browser}) => (
  <div
    className={selected ? css.selectedFilterTag : css.filterTag}
    onClick={() => changeFilter(filterDietaryAttributesChange, value, browser)}
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
