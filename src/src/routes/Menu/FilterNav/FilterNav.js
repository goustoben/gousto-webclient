import React, { PropTypes } from 'react'
import Svg from 'Svg'
import classnames from 'classnames'
import style from './FilterNav.css'

const propTypes = {
	onClick: PropTypes.func,
	ctaText: PropTypes.string,
	sticky: PropTypes.bool,
	menuFilterExperiment: PropTypes.bool,
}

const FilterNav = ({ onClick, ctaText, sticky, menuFilterExperiment }) => (
	(menuFilterExperiment) ? (
		<div className={classnames(style.filterNav, { [style.navBarContainerFixed]: sticky })}>
			<div className={style.filterCta} onClick={onClick}>
				<Svg className={style.filterIcon} fileName="filter-icon" />
				<span className={style.ctaText}>{ctaText}</span>
			</div>
		</div>
	) : null
)

FilterNav.propTypes = propTypes

FilterNav.defaultProps = {
	onClick: () => { },
	ctaText: 'Refine Recipes',
	sticky: false,
}

export default FilterNav
