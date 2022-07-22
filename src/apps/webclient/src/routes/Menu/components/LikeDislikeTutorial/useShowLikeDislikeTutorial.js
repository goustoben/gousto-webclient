import { useSelector } from 'react-redux'

import { getUserAgent } from 'selectors/root'

export const tutorialName = 'likedislikerecipes'

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

export const useShowLikeDislikeTutorial = () => {
  const userAgent = useSelector(getUserAgent)
  const likeDislikeTutorialSeen = useSelector(({ tutorial }) =>
    Boolean(tutorial && tutorial.getIn(['viewed', tutorialName])),
  )

  if (isIgnoredBrowser(userAgent)) {
    return false
  }

  if (likeDislikeTutorialSeen) {
    return false
  }

  return true
}
