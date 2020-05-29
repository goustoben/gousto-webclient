import React from 'react'
import { PropTypes } from 'prop-types'
import { GradientInfoHeader } from './GradientInfoHeader'
import { WaveLinkHeader } from './WaveLinkHeader'

const CollectionHeaderWrapper = ({ collectionsHeaders, changeCollectionById }) => {
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
      <WaveLinkHeader headerAttributes={collectionsHeaders.attributes} changeCollectionById={changeCollectionById} />
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
  changeCollectionById: PropTypes.func
}

CollectionHeaderWrapper.defaultProps = {
  collectionsHeaders: null,
  changeCollectionById: () => {}
}

export { CollectionHeaderWrapper }
