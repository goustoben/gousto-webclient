import React from 'react'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { getCollectionsHeaders } from '../../selectors/collections'
import { useBrandHeadersInfo } from '../../domains/brand'
import { GradientInfoHeader } from './GradientInfoHeader'
import { WaveLinkHeaderContainer } from './LinkHeaderContainer'
import { useShouldRemoveMerchandisingBanner } from './useShouldRemoveMerchandisingBanner'

const CollectionHeaderWrapper = () => {
  const { headers, collectionsPerMenu } = useBrandHeadersInfo()
  const collectionsHeaders = useSelector((state) =>
    getCollectionsHeaders(state, { headers, collectionsPerMenu }),
  )
  const removeMerchandisingBanner = useShouldRemoveMerchandisingBanner()

  if (!collectionsHeaders || removeMerchandisingBanner) {
    return null
  }

  switch (collectionsHeaders.type) {
    case 'gradient-info-header':
      return <GradientInfoHeader headerAttributes={collectionsHeaders.attributes} />
    case 'wave-link-header':
      return <WaveLinkHeaderContainer headerAttributes={collectionsHeaders.attributes} />
    default:
      return null
  }
}

CollectionHeaderWrapper.propTypes = {
  collectionsHeaders: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    attributes: PropTypes.shape(),
  }),
}

CollectionHeaderWrapper.defaultProps = {
  collectionsHeaders: null,
}

export { CollectionHeaderWrapper }
