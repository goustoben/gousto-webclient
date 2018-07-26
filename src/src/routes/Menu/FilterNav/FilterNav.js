import React, { PropTypes } from 'react'
import Icon from 'Icon'
import classnames from 'classnames'
import style from './FilterNav.css'

const FilterNav = ({ onClick, ctaText, sticky }) => (
	<div className={classnames(style.filterNav, { [style.navBarContainerFixed]: sticky })}>
		<div className={style.filterCta} onClick={onClick}>
			<Icon name="fa-angle-down" size={30} />
			<span className={style.ctaText}> {ctaText} </span>
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
