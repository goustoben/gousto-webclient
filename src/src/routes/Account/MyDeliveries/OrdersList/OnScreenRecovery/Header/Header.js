import PropTypes from 'prop-types'
import classnames from 'classnames'
import React from 'react'

import ContentMask from 'ContentMask'
import Svg from 'Svg'

import css from './Header.css'

import { ORDER_TYPE, SUBSCRIPTION_TYPE } from '../config'

const propTypes = {
  offer: PropTypes.shape({
    formatted_value: PropTypes.string,
    raw_message: PropTypes.shape({
      text: PropTypes.string,
      values: PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.string,
      }),
    }),
  }),
  type: PropTypes.oneOf([SUBSCRIPTION_TYPE, ORDER_TYPE])
}

const defaultProps = {
  offer: null,
  type: '',
}

const getFileName = (type) => {
  switch (type) {
  case ORDER_TYPE:
    return 'icon-box'
  case SUBSCRIPTION_TYPE:
    return 'icon-box-pause-subscription'
  default:
    return 'icon-box'
  }
}

const getHeaderClass = (type) => {
  switch (type) {
  case ORDER_TYPE:
    return 'headerOffer'
  case SUBSCRIPTION_TYPE:
    return 'headerSubscription'
  default:
    return 'headerOffer'
  }
}

const Header = ({ offer, type }) => (
  offer ? (
  <div>
    <div className={classnames(css.header, css[getHeaderClass(type)])}>
      <div className={css.mask}>
        <Svg className={css.box} fileName={getFileName(type)} />
        <div className={css.boxText}>
          <span className={css.boxText__title}>{offer.formattedValue}</span>
          <span className={css.boxText__sub}>OFF</span>
        </div>
        <ContentMask />
      </div>
    </div>
  </div>
  ) : <div className={css.spacer} />
)

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export { Header }
