import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import css from './RangeBadge.css'

const RangeBadge = ({ range, selectFoodBrand, isFoodBrandClickable }) => {
  const rangeBadge = (range && range.size) ? range.get('properties'): ''
  const textColor = rangeBadge ? rangeBadge.get('textColor'): ''
  const backgroundColor = rangeBadge ? rangeBadge.get('ribbonColor'): ''
  const borderColor = rangeBadge ? rangeBadge.get('borderColor'): ''
  const rangeSelect = rangeBadge ? {
    name: range.get('name'),
    slug: range.get('slug'),
    borderColor: backgroundColor
  } : null

  const ribbonTextStyle = {
    color: textColor,
    backgroundColor: backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRight: 'none',
    cursor: isFoodBrandClickable ? 'pointer' : 'default'
  }

  const ribbonStyle = {
    borderTop: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
  }

  const arrowStyle = {
    borderLeft: `9px solid ${backgroundColor}`,
  }

  const arrowBorderStyle = {
    borderLeft: `10px solid ${borderColor}`,
  }

  return (rangeBadge) ? (
    <div className={css.rangeBadge}>
      <div
        role="button"
        tabIndex={isFoodBrandClickable ? 0 : -1}
        className={css.ribbonText}
        style={ribbonTextStyle}
        onClick={isFoodBrandClickable ? () => selectFoodBrand(rangeSelect): null}
        onKeyPress={isFoodBrandClickable ? () => selectFoodBrand(rangeSelect) : null}
      >{range.get('name').toUpperCase()}
      </div>
      <div className={css.ribbon} style={ribbonStyle}>
        <div className={css.arrowTopBorder} style={arrowBorderStyle}></div>
        <div className={css.arrowTop} style={arrowStyle}></div>
        <div className={css.arrowBottomBorder} style={arrowBorderStyle}></div>
        <div className={css.arrowBottom} style={arrowStyle}></div>
      </div>
    </div>
  ) : null
}

RangeBadge.propTypes = {
  range: PropTypes.instanceOf(Immutable.Map),
  selectFoodBrand: PropTypes.func,
  isFoodBrandClickable: PropTypes.bool,
}

export default RangeBadge
