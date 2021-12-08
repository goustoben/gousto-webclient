import React from 'react'
import PropTypes from 'prop-types'
import css from './HeaderNavExtendedItemLink.module.css'

const HeaderNavExtendedItemLink = ({ item, isExtendedNavigationVisible }) => (
  <a
    tabIndex={isExtendedNavigationVisible ? '0' : '-1'}
    href={item.url}
    className={css.navExtenedItemLink}
  >
    {item.label}
  </a>
)

HeaderNavExtendedItemLink.propTypes = {
  isExtendedNavigationVisible: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export {
  HeaderNavExtendedItemLink,
}
