import React, { PropTypes } from 'react'
import CanonicalLink from './CanonicalLink'
import Facebook from './Facebook'
import OpenGraph from './OpenGraph'
import SiteVerification from './SiteVerification'
import Twitter from './Twitter'

import templateConfig from 'config/template'
import globals from 'config/globals'

export const generateHref = url => {
	const hostname = `${globals.env === 'production' ? 'www.' : `${globals.env}-frontend-new.`}${globals.domain}`

	return `${globals.protocol}://${hostname}${url || '/'}`
}

const GoustoHelmet = ({ noGTM, requestUrl }) => (
	!noGTM ? (
		<span>
			<CanonicalLink href={generateHref(requestUrl)} />
			<Facebook admins={templateConfig.head.fbAdmins} appID={templateConfig.head.fbAppID} />
			<OpenGraph href={generateHref(requestUrl)} />
			<Twitter href={generateHref(requestUrl)} />
			<SiteVerification />
		</span>
	) : null
)

GoustoHelmet.propTypes = {
	noGTM: PropTypes.bool,
	requestUrl: PropTypes.string.isRequired,
}

export default GoustoHelmet
