import PropTypes from 'prop-types'
import React from 'react'
import templateConfig from 'config/template'
import globals from 'config/globals'
import { getDomain, getProtocol } from 'utils/isomorphicEnvironment'
import { CanonicalLink } from './CanonicalLink'
import { Facebook } from './Facebook'
import { OpenGraph } from './OpenGraph'
import { SiteVerification } from './SiteVerification'
import { Twitter } from './Twitter'

export const generateHref = url => {
  const hostname = `${globals.env === 'production' ? 'www.' : `${globals.env}-frontend.`}${getDomain()}`

  return `${getProtocol()}//${hostname}${url || '/'}`
}

const propTypes = {
  requestUrl: PropTypes.string.isRequired,
  scripts: PropTypes.shape({
    other: PropTypes.bool,
  }),
}

const defaultProps = {
  scripts: {
    other: true,
  }
}

const GoustoHelmet = ({ requestUrl, scripts: { other } }) => (
  other ? (
    <span>
      <CanonicalLink href={generateHref(requestUrl)} />
      <Facebook admins={templateConfig.head.fbAdmins} appID={templateConfig.head.fbAppID} domainVerification={templateConfig.head.domainVerification} />
      <OpenGraph href={generateHref(requestUrl)} />
      <Twitter href={generateHref(requestUrl)} />
      <SiteVerification />
    </span>
  ) : null
)

GoustoHelmet.propTypes = propTypes
GoustoHelmet.defaultProps = defaultProps

export default GoustoHelmet
