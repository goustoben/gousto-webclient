import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'goustouicomponents'
import FilterTagsList from './FilterTagsList'
import css from './FilterTagsNav.css'

const propTypes = {
  onCTAClick: PropTypes.func,
  menuFilterExperiment: PropTypes.bool,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}

const FilterTagsNav = ({ onCTAClick, tags, menuFilterExperiment }) => (
  (menuFilterExperiment) ? (
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
  ) : null
)

FilterTagsNav.propTypes = propTypes

FilterTagsNav.defaultProps = {
  tags: [],
  menuFilterExperiment: false,
  onCTAClick: () => { },
}

export default FilterTagsNav
