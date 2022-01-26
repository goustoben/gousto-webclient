import React from 'react'
import Svg from 'Svg'
import classnames from 'classnames'
import PropTypes from 'prop-types'

// eslint-disable-next-line import/no-unresolved
import typography from 'design-language/typography.css'
import css from './AppBannerDetails.css'

export const AppBannerDetails = ({ name, ratings, variant }) => {
  const starFileName = `app-promo-star${variant === 'dark' ? '-dark' : ''}`

  return (
    <div className={css.appDetails}>
      <Svg fileName="app-promo-logo" className={css.appIcon} />
      <div className={css.platformSpecificDetails}>
        <div data-testing="app-banner-details-heading" className={typography.fontStyleBody}>{`Gousto for ${name}`}</div>
        <div className={css.rating}>
          <Svg className={css.star} fileName={starFileName} />
          <Svg className={css.star} fileName={starFileName} />
          <Svg className={css.star} fileName={starFileName} />
          <Svg className={css.star} fileName={starFileName} />
          <Svg className={css.star} fileName={starFileName} />
          <span data-testing="app-banner-details-ratings" className={classnames(css.ratings, typography.fontStyleBody)}>{`(${ratings})`}</span>
        </div>
      </div>
    </div>
  )
}

AppBannerDetails.propTypes = {
  name: PropTypes.string.isRequired,
  ratings: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['light', 'dark'])
}

AppBannerDetails.defaultProps = {
  variant: 'light'
}
