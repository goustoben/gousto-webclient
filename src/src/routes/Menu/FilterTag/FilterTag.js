import PropTypes from 'prop-types'
import React from 'react'
import Icon from 'Icon'
import css from './FilterTag.css'

const proptypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  filterDietaryAttributesChange: PropTypes.func,
}

const FilterTag = (props) => {

  return (
    <div
      className={props.selected ? css.selectedFilterTag : css.filterTag}
      onClick={() => props.filterDietaryAttributesChange(props.value)}
    >
      {props.selected ? 
        <span className={css.tagIcon}>
          <Icon name="fa-times" className={css.tagImageIcon} />
        </span>
        : null
      }
      {props.text}
    </div>
  )
} 

FilterTag.propTypes = proptypes

export default FilterTag
