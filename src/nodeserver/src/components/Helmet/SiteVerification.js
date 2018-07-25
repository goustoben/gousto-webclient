import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const SiteVerification = () => (
	<Helmet
		meta={[
			{
				name: 'google-site-verification',
				content: 'DGVXZ3PvnmsDtu8yQMQ0sw5gADyU_gd_cbN7ZZXozQ4',
			},
			{
				name: 'p:domain_verify',
				content: 'adfa0b85592a79dcce9f843e17825583',
			},
		]}
	/>
)

SiteVerification.propTypes = {
	admins: PropTypes.array,
	appId: PropTypes.string,
}

export default SiteVerification
