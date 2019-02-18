import PropTypes from 'prop-types'
import React from 'react'

import { Button } from 'goustouicomponents'
import css from './FilterButton.css'

const FilterButton = ({ onClick, count }) => (
	<Button className={css.button} onClick={onClick} disabled={count === 0}>
		{(count) ? `Show me ${count} Recipes` : 'No recipes found'}
	</Button>
)

FilterButton.propTypes = {
  onClick: PropTypes.func,
  count: PropTypes.number,
}

export default FilterButton
