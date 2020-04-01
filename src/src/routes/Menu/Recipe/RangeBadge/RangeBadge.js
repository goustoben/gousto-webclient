import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './RangeBadge.css'

const propTypes = {
  range: PropTypes.instanceOf(Immutable.Map),
  selectFoodBrand: PropTypes.func,
  isFoodBrandClickable: PropTypes.bool,
}

const defaultProps = {
  range: Immutable.Map({}),
  selectFoodBrand: () => {},
  isFoodBrandClickable: false,
}

const RangeBadge = ({ range, selectFoodBrand, isFoodBrandClickable }) => {
  if (!range || !range.has('properties')) {
    return null
  }

  const rangeBadge = range.get('properties')
  const textColor = rangeBadge.get('textColor')
  const backgroundColor = rangeBadge.get('ribbonColor')
  const borderColor = rangeBadge.get('borderColor')
  const foodBrandSlug = range.get('slug')
  let handleClick = null

  const ribbonTextStyle = {
    color: textColor,
    backgroundColor,
    borderColor: `${borderColor}`,
    borderStyle: 'solid',
    borderWidth: '1px',
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
    handleClick = () => selectFoodBrand(foodBrandSlug)
  }

  return (
    <div className={css.rangeBadge}>
      <div
        role="button"
        tabIndex={isFoodBrandClickable ? 0 : -1}
        className={classnames(css.ribbonText, {[css.ribbonTextHighlight]: isFoodBrandClickable})}
        style={ribbonTextStyle}
        onClick={handleClick}
        onKeyPress={handleClick}
        data-testing="foodBrandBanner"
      >
        <span className={classnames(css.foodBrandName, {[css.foodBrandNameUnderlined]: isFoodBrandClickable})}>
          {range.get('name')}
        </span>
        {isFoodBrandClickable ? <span className={css.rightChevron} /> : null}
      </div>

      <div className={css.ribbon} style={ribbonStyle}>
        <div className={css.arrowTopBorder} style={arrowBorderStyle} />
        <div className={css.arrowTop} style={arrowStyle} />
        <div className={css.arrowBottomBorder} style={arrowBorderStyle} />
        <div className={css.arrowBottom} style={arrowStyle} />
      </div>
    </div>
  )
}

RangeBadge.propTypes = propTypes
RangeBadge.defaultProps = defaultProps

export { RangeBadge }
