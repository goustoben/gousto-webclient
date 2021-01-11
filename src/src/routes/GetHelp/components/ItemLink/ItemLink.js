import React from 'react'
import PropTypes from 'prop-types'
import Link from 'Link'

import { Item } from 'goustouicomponents'

const ItemLink = ({ label, trackClick, to, clientRouted, testingSelector }) => (
  <Link to={to} clientRouted={clientRouted} data-testing={testingSelector}>
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
  testingSelector: PropTypes.string,
}

ItemLink.defaultProps = {
  trackClick: () => {},
  clientRouted: true,
  testingSelector: null,
}

export {
  ItemLink
}
