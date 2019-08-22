import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import { AppStoreLinks } from 'components/AppStoreLinks'
import config from 'config'
import css from './AppPromo.css'

const propTypes = {
  device: PropTypes.string,
  trackWelcomeAppPromoClick: PropTypes.func
}

const defaultProps = {
  device: 'desktop',
  trackWelcomeAppPromoClick: () => {}
}

const onAppLinkClick = (e, trackWelcomeAppPromoClick) => {
  const { href } = e.currentTarget
  e.preventDefault()
  trackWelcomeAppPromoClick()
  window.location.assign(href)
}

const mobileAppStoreCTAs = (device, trackWelcomeAppPromoClick) => (
  <a onClick={(e) => onAppLinkClick(e, trackWelcomeAppPromoClick)} data-testing="appPromoCTA" className={classnames(css.mobileAppLink, { [css.hideElement]: device === 'desktop' })} href={config.routes.client.appsRedirect}>
    <Button className={css.getAppCTA} noDecoration >Get the app now</Button>
  </a>
)

const desktopAppStoreCTAs = (device, trackWelcomeAppPromoClick) => (
  <div className={classnames(css.desktopAppLink, { [css.hideElement]: device === 'mobile' })}>
    <AppStoreLinks onClick={(e) => onAppLinkClick(e, trackWelcomeAppPromoClick)} appStoreId={config.apps.appStoreId} playStoreId={config.apps.playStoreId} />
  </div>
)

const AppPromo = ({ device, trackWelcomeAppPromoClick }) => {
  return (
    <div className={css.container}>
      <div className={css.contentContainer}>
        <div className={css.phoneImageContainer}><img className={css.phoneImage} src={require('media/images/app-promo-phone.jpg')} alt="" /></div>
        <div className={css.content}>
          <ul className={css.list}>
            <li><span className={css.bullet}><i className={css.tick} /></span>Get notified when the new menu is out</li>
            <li><span className={css.bullet}><i className={css.tick} /></span>Follow the status of your orders on the go</li>
            <li><span className={css.bullet}><i className={css.tick} /></span>Find all your recipes in your own cookbook</li>
          </ul>
          <div>
            {mobileAppStoreCTAs(device, trackWelcomeAppPromoClick)}
            {desktopAppStoreCTAs(device, trackWelcomeAppPromoClick)}
          </div>
        </div>
      </div >
    </div>
  )
}

AppPromo.propTypes = propTypes
AppPromo.defaultProps = defaultProps

export { AppPromo }
