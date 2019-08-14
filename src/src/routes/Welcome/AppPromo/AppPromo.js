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

const appStoreCTAs = (device, screenSize) => (
  <div className={classnames({ [css.hideLargeScreen]: screenSize === 'smallScreen' }, { [css.hideSmallScreen]: screenSize === 'largeScreen' })}>
    <a data-testing="appBannerCTA" className={classnames(css.mobileAppLink, { [css.hideElement]: device === 'desktop' })} href="https://gousto.co.uk/apps">
      <Button noDecoration>Get the app now</Button>
    </a>
    <div className={classnames(css.desktopAppLink, { [css.hideElement]: device === 'mobile' })}>
      <AppStoreLinks appStoreId={config.apps.appStoreId} playStoreId={config.apps.playStoreId} />
    </div>
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
          {appStoreCTAs(device, 'largeScreen')}
        </div>
      </div >
      {appStoreCTAs(device, 'smallScreen')}
    </div>
  )
}

AppPromo.propTypes = propTypes
AppPromo.defaultProps = defaultProps

export { AppPromo }
