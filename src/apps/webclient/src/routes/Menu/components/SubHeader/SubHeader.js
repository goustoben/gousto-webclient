import React from 'react'

import classnames from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'

import config from 'config/menu'

import { MenuDateRangeContainer } from '../MenuDateRange'
import { DeliveryInfo } from './DeliveryInfo'
import InfoToggle from './InfoToggle'

import css from './SubHeader.css'

const propTypes = {
  fromJoin: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
}

const defaultProps = {
  isAuthenticated: false,
  fromJoin: false,
}

export class SubHeader extends React.PureComponent {
  notificationBanner = () => {
    const { isAuthenticated } = this.props
    const info = config.notification
      .filter((message) => moment().isBetween(message.isAfter, message.isBefore))
      .shift()
    const showNotificaiton = info && (info.notifyGuests || isAuthenticated)

    return (
      showNotificaiton && (
        <InfoToggle>
          <div className={css.infoBanner}>
            {info.title}
            <span className={css.infoIcon} />
          </div>
          <div className={css.infoBannerMessage}>
            {info.line1}
            <ul className={info.line2.length < 2 ? css.noBullet : ''}>
              {/* eslint-disable react/no-array-index-key */}
              {Object.keys(info.line2).map((line, i) => (
                <li key={i}>{info.line2[line]}</li>
              ))}
            </ul>
          </div>
        </InfoToggle>
      )
    )
  }

  render() {
    const { fromJoin } = this.props

    return (
      <div className={classnames(css[fromJoin ? 'subHeaderSimple' : 'subHeader'], css.mobileHide)}>
        <div className={css.subHeaderContent}>
          <div className={css.filter}>
            <MenuDateRangeContainer variant="desktop" />
            <div>{this.notificationBanner()}</div>
            <div className={css.filterRight}>
              <div className={css.filterSection}>
                <DeliveryInfo />
              </div>
            </div>
          </div>
        </div>
        <div className={css.mobile}>
          <DeliveryInfo mobile />
          {this.notificationBanner()}
        </div>
      </div>
    )
  }
}

SubHeader.propTypes = propTypes
SubHeader.defaultProps = defaultProps
