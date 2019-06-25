import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import css from './RangeBadge.css'

const RangeBadge = ({ range, selectFoodBrand }) => {
  const rangeBadge = (range && range.size) ? range.get('properties'): ''
  const textColor = rangeBadge ? rangeBadge.get('textColor'): ''
  const backgroundColor = rangeBadge ? rangeBadge.get('ribbonColor'): ''
  const borderColor = rangeBadge ? rangeBadge.get('borderColor'): ''
  const rangeSelect = rangeBadge ? {
    name: range.get('name'),
    slug: range.get('slug'),
    borderColor: rangeBadge.get('borderColor')
  } : null

  const ribbonTextStyle = {
    color: textColor,
    backgroundColor: backgroundColor,
    border: `1px solid ${borderColor}`,
    borderRight: 'none',
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
      <div role="button" tabIndex={0} className={css.ribbonText} style={ribbonTextStyle} onClick={() => selectFoodBrand(rangeSelect)} onKeyPress={() => selectFoodBrand(rangeSelect)}>{range.get('name').toUpperCase()}</div>
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
}

export default RangeBadge
