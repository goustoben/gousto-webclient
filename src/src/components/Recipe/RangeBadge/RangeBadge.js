import React from 'react'
import PropTypes from 'prop-types'
import { getRangeBadge } from 'utils/recipe'
import colors from 'styles/colors.css'
import css from './RangeBadge.css'

const RangeBadge = ({ range }) => {
  const rangeBadge = getRangeBadge(range)

  const textColor = rangeBadge ? rangeBadge.color: ''
  const backgroundColor = rangeBadge ? rangeBadge.backgroundColor: ''
  const borderColor = rangeBadge ? rangeBadge.borderColor: ''

  const ribbonTextStyle = {
    color: colors[textColor],
    backgroundColor: colors[backgroundColor],
    border: `1px solid ${colors[borderColor]}`,
    borderRight: 'none',
  }

  const ribbonStyle = {
    borderTop: `1px solid ${colors[borderColor]}`,
    borderBottom: `1px solid ${colors[borderColor]}`,
  }

  const arrowStyle = {
    borderLeft: `9px solid ${colors[backgroundColor]}`,
  }

  const arrowBorderStyle = {
    borderLeft: `10px solid ${colors[borderColor]}`,
  }

  return (rangeBadge) ? (
    <div className={css.rangeBadge}>
      <div className={css.ribbonText} style={ribbonTextStyle}>{rangeBadge.text.toUpperCase()}</div>
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
  range: PropTypes.string,
}

export default RangeBadge
