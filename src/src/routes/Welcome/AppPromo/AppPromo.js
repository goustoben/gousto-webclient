import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'
import { AppStoreLinks } from 'components/AppStoreLinks'
import { TickList } from 'TickList'
import routesConfig from 'config/routes'
import appsConfig from 'config/apps'
import css from './AppPromo.css'

const benefits = [
  'Be the first to know when the menu is out',
  'Track your orders on the go',
  'Store all your recipes in your personal cookbook',
]

const propTypes = {
  device: PropTypes.string,
  trackWelcomeAppPromoClick: PropTypes.func,
}

const defaultProps = {
  device: 'desktop',
  trackWelcomeAppPromoClick: () => { },
}

const onAppLinkClick = (e, trackWelcomeAppPromoClick) => {
  const { href } = e.currentTarget
  e.preventDefault()
  trackWelcomeAppPromoClick()
  window.location.assign(href)
}

const mobileAppStoreCTAs = (device, trackWelcomeAppPromoClick) => (
  <a
    onClick={(e) => onAppLinkClick(e, trackWelcomeAppPromoClick)}
    data-testing="appPromoCTA"
    className={classnames(css.mobileAppLink, {
      [css.hideElement]: (device === 'desktop' || device === 'tablet')
    })}
    href={routesConfig.client.appsRedirect}
  >
    <CTA isFullWidth>Download the app</CTA>
  </a>
)

const desktopAppStoreCTAs = (device, trackWelcomeAppPromoClick) => (
  <div className={classnames({ [css.hideElement]: device === 'mobile' })}>
    <AppStoreLinks onClick={(e) => onAppLinkClick(e, trackWelcomeAppPromoClick)} appStoreId={appsConfig.appStoreId} playStoreId={appsConfig.playStoreId} />
  </div>
)

const AppPromo = ({ device, trackWelcomeAppPromoClick }) => (
  <div data-testing="appPromo">
    <div className={css.contentContainer}>
      <div className={css.content}>
        <h2 className={css.header}>Download the Gousto app</h2>
        <TickList listItems={benefits} listItemClassName={css.list} />
        <div>
          {mobileAppStoreCTAs(device, trackWelcomeAppPromoClick)}
          {desktopAppStoreCTAs(device, trackWelcomeAppPromoClick)}
        </div>
      </div>
    </div>
  </div>
)

AppPromo.propTypes = propTypes
AppPromo.defaultProps = defaultProps

export { AppPromo }
