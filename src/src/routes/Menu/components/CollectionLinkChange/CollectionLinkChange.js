import React from 'react'
import PropTypes from 'prop-types'
import Link from 'Link'

export function CollectionLinkChange({ onChangeCollection, color, label, className }) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      clientRouted={false}
      style={{
        color
      }}
      onClick={onChangeCollection}
      className={className}
    >
      {label}
    </Link>
  )
}

CollectionLinkChange.propTypes = {
  onChangeCollection: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  className: PropTypes.any.isRequired,
}
