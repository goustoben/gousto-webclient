import React from 'react'
import { PropTypes } from 'prop-types'
import { GradientInfoHeader } from './GradientInfoHeader'

const CollectionHeaderWrapper = ({ collectionsHeaders }) => {
  if (!collectionsHeaders) {
    return null
  }

  if (collectionsHeaders.type === 'gradient-info-header') {
    return (
      <GradientInfoHeader headerAttributes={collectionsHeaders.attributes} />
    )
  }

  return null
}

CollectionHeaderWrapper.propTypes = {
  collectionsHeaders: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    attributes: PropTypes.shape()
  })
}

CollectionHeaderWrapper.defaultProps = {
  collectionsHeaders: null
}

export { CollectionHeaderWrapper }
