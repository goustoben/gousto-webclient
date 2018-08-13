import React, { PropTypes } from 'react'
import Svg from 'Svg'
import classnames from 'classnames'
import style from './FilterNav.css'

const FilterNav = ({ onClick, ctaText, sticky }) => (
	<div className={classnames(style.filterNav, { [style.navBarContainerFixed]: sticky })}>
		<div className={style.filterCta} onClick={onClick}>
			<Svg className={style.filterIcon} fileName="filter-icon" />
			<span className={style.ctaText}>{ctaText}</span>
		</div>
	</div>
)

FilterNav.propTypes = {
	onClick: PropTypes.func,
	ctaText: PropTypes.string,
	sticky: PropTypes.bool,
}

FilterNav.defaultProps = {
	onClick: () => {},
	ctaText: 'Refine Recipes',
	sticky: false,
}

export default FilterNav
