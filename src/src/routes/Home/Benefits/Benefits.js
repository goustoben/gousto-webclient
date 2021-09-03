import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './Benefits.css'

const allBenefits = [
  {
    id: 'noLockIn',
    iconClassName: css.lockInIcon,
    ariaLabel: 'No lock in icon',
    highlightedText: 'No lock in: ',
    normalText: 'pause or cancel for free anytime',
  },
  {
    id: 'freeDelivery',
    iconClassName: css.truckIcon,
    ariaLabel: 'Free contactless delivery icon',
    highlightedText: 'Free UK delivery',
    normalText: ', 7 days a week',
  },
]

export const Benefits = ({ byId, isCentered, fontStyleS, fontStyleBody }) => {
  const benefits = allBenefits.filter((benefit) => benefit.id === byId)

  return (
    <div
      className={classNames(css.container, {
        [css.isCentered]: isCentered,
        [css.fontStyleS]: fontStyleS,
        [css.fontStyleBody]: fontStyleBody,
      })}
    >
      <div>
        {benefits.map(({ id, iconClassName, ariaLabel, highlightedText, normalText }) => (
          <div role="img" aria-label={ariaLabel} key={id} className={css.row}>
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
  byId: PropTypes.string.isRequired,
  isCentered: PropTypes.bool,
  fontStyleS: PropTypes.bool,
  fontStyleBody: PropTypes.bool,
}

Benefits.defaultProps = {
  isCentered: false,
  fontStyleS: false,
  fontStyleBody: false,
}
