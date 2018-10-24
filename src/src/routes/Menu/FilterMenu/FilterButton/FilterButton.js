import React, { PropTypes } from 'react'

import css from './FilterButton.css'
import { Button } from 'goustouicomponents'

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
