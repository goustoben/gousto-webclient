import PropTypes from 'prop-types'
import React from 'react'
import Link from 'Link'
import classNames from 'classnames'
import Svg from 'Svg'
import css from './Breadcrumbs.css'

const Breadcrumbs = ({ currentId, items, trackCheckoutNavigationLinks }) => {
  const activeIndex = items && items.findIndex(item => item.id === currentId)
  const trackNavigation = (label) => () => trackCheckoutNavigationLinks(label)

  return (
    <div className={css.breadcrumbsContainer}>
      <ul className={css.breadcrumbsList}>
        {items.map(({ id, label }, index) => (
          <li key={id} className={css.listItem}>
            <Link
              clientRouted
              to={`/check-out/${id}`}
              tracking={trackNavigation(label)}
              className={classNames({
                [css.activeItem]: index === activeIndex || index < activeIndex,
                [css.futureItem]: index > activeIndex,
              })}
            >
              {label}
            </Link>
            <Svg
              fileName="icon-chevron-small-right"
              className={classNames(
                css.breadcrumbsSeparator,
                { [css.hidden]: index === items.length - 1 }
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  currentId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  trackCheckoutNavigationLinks: PropTypes.func.isRequired,
}

export {
  Breadcrumbs,
}
