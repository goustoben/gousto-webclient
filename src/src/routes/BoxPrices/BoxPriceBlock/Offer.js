import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import css from './BoxPriceBlock.css'

export const Offer = ({
  icon,
  detailText,
  text,
}) => (
  <div className={css.offer}>
    <icon className={classNames(css.icon, css[icon])} />
    <p className={css.offerOption}>
      <bold className={css.offerOptionDetail}>{detailText}</bold>
      {text}
    </p>
  </div>
)

Offer.propTypes = {
  icon: PropTypes.string.isRequired,
  detailText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
