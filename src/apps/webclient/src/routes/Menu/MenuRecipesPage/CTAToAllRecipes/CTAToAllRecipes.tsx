import React from 'react'
import { useDispatch } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import spottyBorder from 'media/images/menu/spottyTileBorder.png'
import { useCollections, CollectionId } from 'routes/Menu/domains/collections'
import css from './CTAToAllRecipes.css'

const trackAction = () => ({
  type: actionTypes.TRACKING_CTA_TO_ALL_RECIPES_CLICKED,
  trackingData: {
    actionType: trackingKeys.clickAllRecipes,
  },
})

const CTAToAllRecipes = () => {
  const dispatch = useDispatch()
  const { currentCollectionId, changeCollectionById } = useCollections()

  const onClick = React.useCallback(() => {
    changeCollectionById(CollectionId.AllRecipes)
    dispatch(trackAction())
  }, [changeCollectionById])

  if (currentCollectionId === CollectionId.Recommendations) {
    return (
      <div className={css.ctaAllRecipe}>
        <section className={css.ctaWrapper}>
          <img src={spottyBorder} className={css.spottyBorder} alt="" />
          <div className={css.ctaInnerContainer}>
            <p className={css.ctaText}>Want to see more?</p>
            <button className={css.ctaButton} type="button" onClick={onClick} onKeyPress={onClick}>
              View all recipes
            </button>
          </div>
        </section>
      </div>
    )
  }

  return null
}

export { CTAToAllRecipes }
