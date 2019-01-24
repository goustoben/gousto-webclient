import React from 'react'
import PropTypes from 'prop-types'
import { getRangeBadge } from 'utils/recipe'
import classnames from 'classnames'
import css from './RangeBadge.css'

const RangeBadge = ({ range }) => {
  const rangeBadge = getRangeBadge(range)
  const arrowTop = rangeBadge ? 'arrowTop' + rangeBadge.borderColor : ''
  const arrowBottom = rangeBadge ? 'arrowBottom' + rangeBadge.borderColor: '' 
  const textClass = rangeBadge ? 'ribbonText' + rangeBadge.backgroundColor: ''

  return (rangeBadge) ? (
    <div className={css.rangeBadge}>
      <div className={classnames(css.ribbonText, css[textClass])}>{rangeBadge.text.toUpperCase()}</div>
      <div className={css.ribbon}>
        <div className={css.arrowWhite}></div>
        <div className={css[arrowTop]}></div>
        <div className={css[arrowBottom]}></div>
      </div>
    </div>
  ) : null
}

RangeBadge.propTypes = {
  range: PropTypes.string,
}

export default RangeBadge
