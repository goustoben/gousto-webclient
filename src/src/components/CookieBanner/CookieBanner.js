import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/cookies'
import Link from 'Link'
import css from './CookieBanner.css'

const CookieBanner = ({ copy, isCookiePolicyAccepted, cookiePolicyAcceptanceChange }) => {
  if (isCookiePolicyAccepted) {
    return null
  }

  return (
    <div className={css.container} data-testing="cookiePolicyBanner">
      <div>
        <p className={css.description}>
          {copy.description}
          <Link to={config.findOutMoreLink} clientRouted={false}>
            <span className={css.linkMessage}>
              {copy.findMore}
            </span>
          </Link>
        </p>
        <a
          role="button"
          className={css.button}
          data-testing="cookiePolicyBannerBtn"
          onClick={() => {
            cookiePolicyAcceptanceChange(true)
          }}
        >
          {copy.button}
        </a>
      </div>
    </div>
  )
}

CookieBanner.propTypes = {
  copy: PropTypes.shape({
    button: PropTypes.string,
    findMore: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isCookiePolicyAccepted: PropTypes.bool,
  cookiePolicyAcceptanceChange: PropTypes.func.isRequired,
}

CookieBanner.defaultProps = {
  isCookiePolicyAccepted: false,
}

export default CookieBanner
