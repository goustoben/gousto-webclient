import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import classnames from 'classnames'
import style from './FilterNav.css'

const propTypes = {
  onClick: PropTypes.func,
  ctaText: PropTypes.string,
  sticky: PropTypes.bool,
  menuFilterExperiment: PropTypes.bool,
  isLoadingHeart: PropTypes.bool,
  ifRecommendationIsSelected: PropTypes.bool,
}

const FilterNav = ({ onClick, ctaText, sticky, menuFilterExperiment, isLoadingHeart, ifRecommendationIsSelected }) => (
  (menuFilterExperiment) ? (
    <div className={classnames(style.filterNav, { [style.navBarContainerFixed]: sticky })}>
      <div className={style.filterCta} onClick={onClick}>
        {(isLoadingHeart && ifRecommendationIsSelected) && <Svg className={style.heartIconWhite} fileName="heart-icon-w-outline" />}
        {(!isLoadingHeart && ifRecommendationIsSelected) && <div className={style.heartIcon} />}
        {(!ifRecommendationIsSelected) && <Svg className={style.filterIcon} fileName="filter-icon" />}
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
