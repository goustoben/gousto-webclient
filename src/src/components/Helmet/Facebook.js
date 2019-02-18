import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const Facebook = ({ admins, appID }) => {
  const metaData = [
    {
      property: 'fb:app_id',
      content: appID,
    },
  ]

  if (admins && admins.length) {
    admins.forEach(admin => metaData.push({
      property: 'fb:admins',
      content: admin,
    }))
  }

  return <Helmet meta={metaData} />
}

Facebook.defaultProps = {
  admins: [],
}

Facebook.propTypes = {
  admins: PropTypes.array.isRequired,
  appID: PropTypes.string.isRequired,
}

export default Facebook
