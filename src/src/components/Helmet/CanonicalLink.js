import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const CanonicalLink = ({ href }) => (
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

export default CanonicalLink
