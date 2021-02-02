import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import classnames from 'classnames'
import { client } from 'config/routes'
import { redirect } from 'utils/window'
import typography from 'design-language/typography.css'
import { AppBannerDetails } from './AppBannerDetails'
import css from './AppBanner.css'

const propTypes = {
  name: PropTypes.string.isRequired,
  ratings: PropTypes.string.isRequired,
  showAppBanner: PropTypes.bool.isRequired,
  appBannerDismiss: PropTypes.func.isRequired,
  trackingAppPromoCTAClick: PropTypes.func.isRequired,
  trackingAppPromoBannerView: PropTypes.func.isRequired,
}

class AppBanner extends Component {
  componentDidMount() {
    const { showAppBanner } = this.props

    if (showAppBanner) {
      const { trackingAppPromoBannerView, name } = this.props
      trackingAppPromoBannerView({ platform: name })
    }
  }

  handleCTAClick = () => {
    const { trackingAppPromoCTAClick, name } = this.props

    trackingAppPromoCTAClick({ platform: name })
    redirect(client.appsRedirect)
  }

  render() {
    const { name, ratings, showAppBanner, appBannerDismiss } = this.props

    return showAppBanner
      ? (
        <div className={css.appBannerWrapper}>
          <button data-testing="appBannerDismiss" type="button" className={css.closeButton} onClick={() => appBannerDismiss()}>
            <Svg fileName="icon_dismiss-app-banner" className={css.closeIcon} />
          </button>
          <AppBannerDetails name={name} ratings={ratings} />
          <button
            type="button"
            data-testing="appBannerCTA"
            className={classnames(css.appLink, typography.fontSemiBold)}
            onClick={this.handleCTAClick}
          >
            Install
          </button>
        </div>
      ) : null
  }
}

AppBanner.propTypes = propTypes

export { AppBanner }
