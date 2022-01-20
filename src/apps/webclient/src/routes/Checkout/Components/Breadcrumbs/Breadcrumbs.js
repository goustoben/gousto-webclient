import PropTypes from 'prop-types'
import React from 'react'
import Link from 'Link'
import classNames from 'classnames'
import Svg from 'Svg'
import css from './Breadcrumbs.css'

const Breadcrumbs = ({
  currentId,
  items,
  trackCheckoutNavigationLinks,
  lastReachedStepIndex,
  isPaymentBeforeChoosingEnabled,
}) => {
  const trackNavigation = (label) => () => trackCheckoutNavigationLinks(label)

  return (
    <div className={css.breadcrumbsContainer}>
      <ul className={css.breadcrumbsList}>
        {items.map(({ id, label }, index) => (
          <li key={id} className={css.listItem}>
            {index > lastReachedStepIndex ? (
              <span className={css.futureItem}>{label}</span>
            ) : (
              <Link
                clientRouted
                to={`/check-out/${id}`}
                tracking={trackNavigation(label)}
                className={classNames(css.linkItem, { [css.isActive]: id === currentId })}
              >
                {label}
              </Link>
            )}
            <Svg
              fileName="icon-chevron-small-right"
              className={classNames(css.breadcrumbsSeparator, {
                [css.hidden]: index === items.length - 1,
                [css.removeMargin]: isPaymentBeforeChoosingEnabled,
              })}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trackCheckoutNavigationLinks: PropTypes.func.isRequired,
  lastReachedStepIndex: PropTypes.number.isRequired,
  isPaymentBeforeChoosingEnabled: PropTypes.bool,
}

Breadcrumbs.defaultProps = {
  isPaymentBeforeChoosingEnabled: false,
}

export { Breadcrumbs }
