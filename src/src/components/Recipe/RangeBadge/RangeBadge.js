import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './RangeBadge.css'

const RangeBadge = ({ range, selectFoodBrand, isFoodBrandClickable }) => {
  let textColor
  let backgroundColor
  let borderColor
  let rangeSelect
  let rangeBadge
  let handleClick = null

  if (range && range.size) {
    rangeBadge = range.get('properties')

    textColor = rangeBadge.get('textColor')
    backgroundColor = rangeBadge.get('ribbonColor')
    borderColor = rangeBadge.get('borderColor')
    rangeSelect = {
      name: range.get('name'),
      slug: range.get('slug'),
      borderColor: backgroundColor
    }
  }

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
  if (isFoodBrandClickable) {
    handleClick = () => selectFoodBrand(rangeSelect)
  }

  return (rangeBadge) ? (
    <div className={css.rangeBadge}>
      <div
        role="button"
        tabIndex={isFoodBrandClickable ? 0 : -1}
        className={classnames(css.ribbonText, {[css.ribbonTextHighlight]: isFoodBrandClickable})}
        style={ribbonTextStyle}
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        <span className={classnames(css.foodBrandName, {[css.foodBrandNameUnderlined]: isFoodBrandClickable})}>
          {range.get('name')}
        </span>
        {isFoodBrandClickable ? <span className={css.rightChevron}></span> : null}
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
