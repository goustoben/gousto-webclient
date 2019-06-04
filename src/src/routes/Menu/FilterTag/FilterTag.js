import PropTypes from 'prop-types'
import React from 'react'
import css from './FilterTag.css'

const proptypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  selected: PropTypes.bool,
  filterApply: PropTypes.func,
  browser: PropTypes.string,
}

const changeFilter = (filterApply, value, type, browser) => {
  const scrollDepth = (browser === 'mobile') ? 250 : 346
  filterApply(type, value)
  if (window.pageYOffset > 255) {
    window.scrollTo(0,scrollDepth)
  }
}

const FilterTag = ({selected, value, text, filterApply, type, browser}) => (
  <div
    className={selected ? css.selectedFilterTag : css.filterTag}
    onClick={() => changeFilter(filterApply, value, type, browser)}
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
