import PropTypes from 'prop-types'
import classnames from 'classnames'
import React from 'react'

import ContentMask from 'ContentMask'
import Svg from 'Svg'

import css from './Header.css'

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
  type: PropTypes.oneOf(['subscription', 'order'])
}

const defaultProps = {
  offer: null,
  type: '',
}

const getFileName = (type) => {
  switch (type) {
  case 'order':
    return 'icon-box'
  case 'subscription':
    return 'icon-box-pause-subscription'
  default:
    return 'icon-box'
  }
}

const Header = ({ offer, type }) => (
  offer ? (
  <div>
    <div className={classnames(css.header, css[`header--${type}`])}>
      <div className={css.mask}>
        <Svg className={classnames(css.box, css[`box--${type}`])} fileName={getFileName(type)} />
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
