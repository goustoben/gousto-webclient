import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Portal } from 'Portal'
import { Tutorial, Step } from 'Tutorial'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { getRecommendationShortName } from '../../selectors/collections'
import { CollectionSlug } from '../../domains/collections'
import css from './JustForYouTutorial.css'
import { useShowJFYTutorial } from './useShowJFYTutorial'

const tutorialName = 'just_for_you'

export const JustForYouTutorial = () => {
  const dispatch = useDispatch()
  const collectionName = useSelector(getRecommendationShortName) || 'Chosen For You'
  const showTutorial = useShowJFYTutorial()

  const onCloseTutorial = (step) => {
    dispatch(incrementTutorialViewed('justforyou'))
    dispatch(tutorialTracking(tutorialName, step, true))
  }

  const trackStepViewed = (step) => {
    dispatch(tutorialTracking(tutorialName, step, false))
  }

  if (!showTutorial) {
    return null
  }

  return (
    <Portal>
      <Tutorial onClose={onCloseTutorial} trackStepViewed={trackStepViewed}>
        <Step selector={`[data-slug='${CollectionSlug.Recommendations}']`}>
          <p className={css.intro}>Introducing</p>
          <p className={css.main}>{collectionName}</p>
          <p className={css.text}>
            {
              'We now show you a personalised selection of recipes we think you\u0027ll really enjoy'
            }
          </p>
        </Step>
        <Step selector="[data-slug='all-recipes']">
          <p className={css.text}>
            You can still browse all available recipes by clicking All Recipes.
          </p>
        </Step>
      </Tutorial>
    </Portal>
  )
}
