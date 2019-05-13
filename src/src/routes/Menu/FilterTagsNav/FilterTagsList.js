import PropTypes from 'prop-types'
import React from 'react'
import css from './FilterTagsList.css'
import FilterTag from '../FilterTag/FilterTagContainer'

const FilterTagList = ({ tags }) => (
  <div className={css.filterTagList}>
    <span>Quick filter: </span>
    {tags.map((tag) => <FilterTag key={tag.text} {...tag} />)}
  </div>
)

FilterTagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
      selected: PropTypes.bool,
    }),
  ),
}

FilterTagList.defaultProps = {
  tags: [],
}

export default FilterTagList
