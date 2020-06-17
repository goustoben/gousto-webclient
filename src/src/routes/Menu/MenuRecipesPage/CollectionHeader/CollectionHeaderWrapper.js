import React from 'react'
import { PropTypes } from 'prop-types'
import { GradientInfoHeader } from './GradientInfoHeader'
import { WaveLinkHeaderContainer, SimpleLinkHeaderContainer } from './LinkHeaderContainer'

const CollectionHeaderWrapper = ({ collectionsHeaders }) => {
  if (!collectionsHeaders) {
    return null
  }

  switch (collectionsHeaders.type) {
  case 'gradient-info-header':
    return (
      <GradientInfoHeader headerAttributes={collectionsHeaders.attributes} />
    )
  case 'wave-link-header':
    return (
      <WaveLinkHeaderContainer headerAttributes={collectionsHeaders.attributes} />
    )
  case 'simple-link-header':
    return (
      <SimpleLinkHeaderContainer headerAttributes={collectionsHeaders.attributes} />
    )
  default:
    return null
  }
}

CollectionHeaderWrapper.propTypes = {
  collectionsHeaders: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    attributes: PropTypes.shape()
  }),
}

CollectionHeaderWrapper.defaultProps = {
  collectionsHeaders: null,
}

export { CollectionHeaderWrapper }
