import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const Facebook = ({ admins, appID, domainVerification }) => {
  const metaData = [
    {
      property: 'fb:app_id',
      content: appID,
    },
    {
      name: 'facebook-domain-verification',
      content: domainVerification,
    }
  ]

  if (admins && admins.length) {
    admins.forEach(admin => metaData.push({
      property: 'fb:admins',
      content: admin,
    }))
  }

  return <Helmet meta={metaData} />
}

Facebook.propTypes = {
  admins: PropTypes.array.isRequired,
  appID: PropTypes.string.isRequired,
  domainVerification: PropTypes.string.isRequired,
}

export default Facebook
