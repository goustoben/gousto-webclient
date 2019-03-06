import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const SiteVerification = () => (
	<Helmet
	  meta={[
	    {
	      name: 'google-site-verification',
	      content: 'DGVXZ3PvnmsDtu8yQMQ0sw5gADyU_gd_cbN7ZZXozQ4',
	    },
	    {
	      name: 'google-site-verification',
	      content: 'yHaW3pMjZbjSxh9XYcmSgcmd8FHN-9vJorgj3p0a7w0',
	    },
	    {
	      name: 'p:domain_verify',
	      content: 'adfa0b85592a79dcce9f843e17825583',
	    },
	    {
	      name: 'msvalidate.01',
	      content: 'F155B4DB69FB385148413701F29E16CF',
	    }
	  ]}
	/>
)

SiteVerification.propTypes = {
  admins: PropTypes.array,
  appId: PropTypes.string,
}

export default SiteVerification
