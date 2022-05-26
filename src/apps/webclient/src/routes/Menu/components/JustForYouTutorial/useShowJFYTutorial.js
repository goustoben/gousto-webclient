import { useSelector } from 'react-redux'

import { getUserAgent } from 'selectors/root'

import { CollectionSlug, useCollections } from '../../domains/collections'

const isIgnoredBrowser = (userAgent) => {
  if (userAgent.indexOf('Edge') >= 0) {
    return true
  }

  if (userAgent.indexOf('Trident') >= 0) {
    // IE
    return true
  }

  return false
}

export const useShowJFYTutorial = () => {
  const userAgent = useSelector(getUserAgent)
  const jfyTutorialSeen = useSelector(({ tutorial }) =>
    Boolean(tutorial && tutorial.getIn(['viewed', 'justforyou'])),
  )
  const { collections } = useCollections()

  if (isIgnoredBrowser(userAgent)) {
    return false
  }

  if (jfyTutorialSeen) {
    return false
  }

  const recommendationCollection = collections.find(
    (c) => c.get('slug') === CollectionSlug.Recommendations,
  )

  if (!recommendationCollection) {
    return false
  } else {
    const collectionNameForTutorial =
      recommendationCollection.getIn(['properties', 'tutorial']) || ''

    // The lack of 'jfy' as "tutorial's name" indicate that the Recommendation collection
    // contains general default recommendations offered to all new customers.
    // Its presence means customer has personally tailored recommendations based on purchase history

    if (collectionNameForTutorial !== 'jfy') {
      return false
    }
  }

  return true
}
