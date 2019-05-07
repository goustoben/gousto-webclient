import PropTypes from 'prop-types'
import React from 'react'
import FilterTagsList from './FilterTagsList'
import css from './FilterTagsNav.css'

const propTypes = {
  menuFilterExperiment: PropTypes.bool,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}

const FilterTagsNav = ({ tags, menuFilterExperiment }) => (
  (menuFilterExperiment) ? (
    <div className={css.filterTagContainer}>
      <div className={css.filterListContainer}>
        <FilterTagsList tags={tags} />
      </div>
    </div>
  ) : null
)

FilterTagsNav.propTypes = propTypes

FilterTagsNav.defaultProps = {
  tags: [],
  menuFilterExperiment: false,
  onCTAClick: () => { },
}

export default FilterTagsNav
