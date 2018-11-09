import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './FilterTagsList.css'
import FilterTag from '../FilterTag/FilterTagContainer'

const FilterTagList = ({ tags }) => (
	<div className={classnames(css.filterTagList, { [css.divider]: tags.length > 0 })}>
		{tags.map(({ text, type, value, slug }) => <FilterTag key={text} text={text} type={type} value={value} slug={slug} />)}
	</div>
)

FilterTagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
      slug: PropTypes.string,
    }),
  ),
}

FilterTagList.defaultProps = {
  tags: [],
}

export default FilterTagList
