import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import AppStoreLinks from 'Footer/AppStoreLinks'
import config from 'config'
import css from './AppPromo.css'

const propTypes = {
  device: PropTypes.string,
}

const defaultProps = {
  device: 'desktop'
}

const mobileAppStoreCTAs = device => (
  <a data-testing="appBannerCTA" className={classnames(css.mobileAppLink, { [css.hideElement]: device === 'desktop' })} href="https://gousto.co.uk/apps">
    <Button className={css.getAppCTA} noDecoration>Get the app now</Button>
  </a>
)

const desktopAppStoreCTAs = device => (
  <div className={classnames(css.desktopAppLink, { [css.hideElement]: device === 'mobile' })}>
    <AppStoreLinks appStoreId={config.apps.appStoreId} playStoreId={config.apps.playStoreId} />
  </div>
)

const AppPromo = ({ device }) => {
  return (
    <div className={css.container}>
      <div className={css.contentContainer}>
        <div className={css.phoneImageContainer}><img className={css.phoneImage} src={require('media/images/app_promo_phone.png')} alt="" /></div>
        <div className={css.content}>
          <ul className={css.list}>
            <li><span className={css.bullet}><i className={css.tick} /></span>Get notified when the new menu is out</li>
            <li><span className={css.bullet}><i className={css.tick} /></span>Follow the status of your orders on the go</li>
            <li><span className={css.bullet}><i className={css.tick} /></span>Find all your recipes in your own cookbook</li>
          </ul>
          <div className={css.hideOnSmallScreen}>
            {mobileAppStoreCTAs(device)}
            {desktopAppStoreCTAs(device)}
          </div>
        </div>
      </div >
      <div className={css.hideOnLargerScreen}>
        {mobileAppStoreCTAs(device)}
        {desktopAppStoreCTAs(device)}
      </div>
    </div>
  )
}

AppPromo.propTypes = propTypes
AppPromo.defaultProps = defaultProps

export { AppPromo }
