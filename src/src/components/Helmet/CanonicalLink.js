import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

export const CanonicalLink = ({ href }) => (
  <Helmet
    link={[
      {
        rel: 'canonical',
        href,
      },
    ]}
  />
)

CanonicalLink.propTypes = {
  href: PropTypes.string.isRequired,
}
