import React from 'react'
import PropTypes from 'prop-types'
import Link from 'Link'

import { Item } from 'goustouicomponents'

const ItemLink = ({ label, trackClick, to, clientRouted }) => (
  <Link to={to} clientRouted={clientRouted}>
    <Item
      label={label}
      trackClick={trackClick}
    />
  </Link>
)

ItemLink.propTypes = {
  label: PropTypes.string.isRequired,
  trackClick: PropTypes.func,
  to: PropTypes.string.isRequired,
  clientRouted: PropTypes.bool,
}

ItemLink.defaultProps = {
  trackClick: () => {},
  clientRouted: true,
}

export {
  ItemLink
}
