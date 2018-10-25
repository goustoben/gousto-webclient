import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import css from './Vegetarian.css'

const Vegetarian = ({ filterVegetarian, onFilterVegetarianChange, mobile }) => (
	<span className={css.vegetarian} onClick={() => { onFilterVegetarianChange(!filterVegetarian) }}>
		{mobile ? <span className={classNames(filterVegetarian ? css.checkboxChecked : css.checkboxEmpty, css.checkboxMobile)} /> : null}
		Vegetarian only
		{mobile ? null : <span className={filterVegetarian ? css.checkboxChecked : css.checkboxEmpty} />}
	</span>
)

Vegetarian.propTypes = {
	filterVegetarian: PropTypes.bool.isRequired,
	onFilterVegetarianChange: PropTypes.func.isRequired,
	mobile: PropTypes.bool.isRequired,
}

export default Vegetarian
