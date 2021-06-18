import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './Benefits.css'

const allBenefits = [
  {
    iconClassName: css.lockInIcon,
    ariaLabel: 'No lock in icon',
    highlightedText: 'No lock in: ',
    normalText: 'pause or cancel for free anytime',
  },
  {
    iconClassName: css.truckIcon,
    ariaLabel: 'Free contactless delivery icon',
    highlightedText: 'Free UK delivery, ',
    normalText: '7 days a week',
  },
]

const Benefits = ({ isHomepageFreeDeliveryEnabled }) => {
  const benefits = isHomepageFreeDeliveryEnabled ? allBenefits : allBenefits.slice(0, 1)

  return (
    <div
      className={classNames(css.container, {
        [css.isHomepageFreeDeliveryEnabled]: isHomepageFreeDeliveryEnabled,
      })}
    >
      <div>
        {benefits.map(({ iconClassName, ariaLabel, highlightedText, normalText }) => (
          <div role="img" aria-label={ariaLabel} key={iconClassName} className={css.row}>
            <div className={classNames(css.icon, iconClassName)} />
            <div className={css.text}>
              <span className={css.highlight}>{highlightedText}</span>
              {normalText}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Benefits.propTypes = {
  isHomepageFreeDeliveryEnabled: PropTypes.bool,
}

Benefits.defaultProps = {
  isHomepageFreeDeliveryEnabled: false,
}

export { Benefits }
