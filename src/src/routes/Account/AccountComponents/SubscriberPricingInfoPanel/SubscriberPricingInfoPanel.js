import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import css from './SubscriberPricingInfoPanel.module.css'

const propTypes = {
  variant: PropTypes.string.isRequired,
}

const CONTENT = {
  resubscribe: {
    title: 'So many tasty benefits',
    row1: 'Save on every repeat order',
    row2: 'Guarantee your weekly delivery slot',
    row3: 'Skip boxes whenever you like',
  },
  offer: {
    title: 'Reasons to stay subscribed',
    row1: "You're saving on every repeat order",
    row2: 'Guarantee your weekly delivery slot',
    row3: 'Skip boxes whenever you like',
  },
  noOffer: {
    title: 'Reasons to stay subscribed',
    row1: "You're saving on every repeat order vs ordering one off",
    row2: 'Guarantee your weekly delivery slot',
    row3: 'Skip boxes whenever you like',
  },
}

export const SubscriberPricingInfoPanel = ({ variant }) => (
  <div className={classNames(css.infoPanel, css[variant])}>
    <div className={css.infoPanelContentContainer}>
      <div className={css.content}>
        <p className={css.title}>{CONTENT[variant].title}</p>
        <div className={classNames(css[`body${variant}`])}>
          <div className={css.row}>
            <div className={classNames(css.icon, css[`${variant}DealIcon`])} />
            <div>{CONTENT[variant].row1}</div>
          </div>
          <div className={css.row}>
            <div className={classNames(css.icon, css[`${variant}DeliveryIcon`])} />
            <div>{CONTENT[variant].row2}</div>
          </div>
          <div className={css.row}>
            <div className={classNames(css.icon, css[`${variant}MediaIcon`])} />
            <div>{CONTENT[variant].row3}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

SubscriberPricingInfoPanel.propTypes = propTypes
