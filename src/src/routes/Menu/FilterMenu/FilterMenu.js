import React, { PropTypes } from 'react'

import css from './FilterMenu.css'
import Icon from 'Icon'
import Overlay from 'Overlay'
import FilterButton from './FilterButton'
import CollectionFilter from './CollectionFilter'
import DietTypesFilter from './DietTypesFilter'
import TotalTimeFilter from './TotalTimeFilter'
import DietaryAttributesFilter from './DietaryAttributesFilter'

const FilterMenu = ({ open, filterMenuClose, slideFrom, filterMenuApply, filterMenuRevertFilters, clearAllFilters }) => (
	<Overlay open={open} from={slideFrom} resetScroll>
		<div onClick={() => filterMenuClose()}>
			<div className={css.container} onClick={(e) => e.stopPropagation()}>
				<div className={css.content}>
					<div className={css.header}>
						<span className={css.close} onClick={() => filterMenuClose()}>
							<Icon name="fa-angle-left" size={22} className={`${css.closeIconDesktop}`} />
						</span>
						<span className={css.closeMobile} onClick={() => filterMenuRevertFilters()}>
							<Icon name="fa-times" size={22} className={`${css.closeIconMobile}`} />
						</span>
						<h2 className={css.title}>Filter by</h2>
						<span className={css.clearAll} onClick={() => clearAllFilters()}>Clear all</span>
					</div>
					<div className={css.filters}>
						<div className={css.filter}>
							<CollectionFilter />
						</div>
						<div className={css.filter}>
							<DietTypesFilter />
						</div>
						<div className={css.filter}>
							<DietaryAttributesFilter />
						</div>
						<div className={css.filter}>
							<TotalTimeFilter />
						</div>
					</div>
				</div>
				<div className={css.stickyContainer}>
					<div className={css.stickyButton}>
						<FilterButton onClick={() => filterMenuApply()} />
					</div>
				</div>
			</div>
		</div>
	</Overlay>
)

FilterMenu.propTypes = {
	open: PropTypes.bool,
	slideFrom: PropTypes.oneOf(['bottom', 'right']),
	filterMenuClose: PropTypes.func,
	filterMenuApply: PropTypes.func,
	filterMenuRevertFilters: PropTypes.func,
	clearAllFilters: PropTypes.func,
}

FilterMenu.defaultProps = {
	open: false,
	slideFrom: 'bottom',
}

export default FilterMenu
