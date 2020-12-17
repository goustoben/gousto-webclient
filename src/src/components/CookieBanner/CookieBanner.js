import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/cookies'
import Link from 'Link'
import classnames from 'classnames'
import css from './CookieBanner.css'

const CookieBanner = ({
  cookiePolicyAcceptanceChange,
  copy,
  isCookiePolicyAccepted,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
  isPromoAppBannerEnabled,
}) => {
  if (!isCookiePolicyAccepted) {
    trackCookiePolicyVisible()

    return (
      <div
        className={classnames(css.container, isPromoAppBannerEnabled && css.bottomPositioning)}
        data-testing="cookiePolicyBanner"
      >
        <div>
          <p className={css.description}>
            {copy.description}
            <Link to={config.findOutMoreLink} clientRouted={false}>
              <span className={css.linkMessage}>
                {copy.findMore}
              </span>
            </Link>
          </p>
          <button
            type="button"
            tabIndex="0"
            className={css.button}
            data-testing="cookiePolicyBannerBtn"
            onClick={() => {
              cookiePolicyAcceptanceChange(true)
              trackCookiePolicyAccepted()
            }}
          >
            {copy.button}
          </button>
        </div>
      </div>
    )
  }

  return null
}

CookieBanner.propTypes = {
  copy: PropTypes.shape({
    button: PropTypes.string,
    findMore: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isCookiePolicyAccepted: PropTypes.bool,
  cookiePolicyAcceptanceChange: PropTypes.func.isRequired,
  trackCookiePolicyAccepted: PropTypes.func.isRequired,
  trackCookiePolicyVisible: PropTypes.func.isRequired,
  isPromoAppBannerEnabled: PropTypes.bool,
}

CookieBanner.defaultProps = {
  isCookiePolicyAccepted: false,
  isPromoAppBannerEnabled: false,
}

export { CookieBanner }
