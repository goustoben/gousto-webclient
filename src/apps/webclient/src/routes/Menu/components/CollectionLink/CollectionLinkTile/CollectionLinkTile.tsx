import React, { useCallback } from 'react'

import { Recipe, TransformedRecipeImage } from '@library/api-menu-service'

import { useCollections } from '../../../domains/collections'
import { useMenu } from '../../../domains/menu'
import { MenuCollection } from '../../../types'
import { findImageUrls } from './Image/findImageUrls'
import { useTracking } from './tracking'

import css from './CollectionLinkTile.css'

const getDefaultImage = (srcs: TransformedRecipeImage['urls']) => {
  if (srcs.length === 0) {
    return null
  }

  const sortedSrcs = srcs.sort((a, b) => b.width - a.width)
  const midpointInArray = Math.floor(sortedSrcs.length / 2)

  return sortedSrcs[midpointInArray]?.src || ''
}

const extractImageFromRecipe = (recipe: Recipe) => {
  const { images } = recipe.media
  const imageUrls = findImageUrls(images)
  const imageURL = getDefaultImage(imageUrls)

  return imageURL
}

type CollectionLinkProps = {
  collection: MenuCollection
}

export function CollectionLinkTile({ collection }: CollectionLinkProps) {
  const track = useTracking()
  const { changeCollectionById } = useCollections()

  // No selectedVariants as they do not influence counter
  const { getRecipesForCollectionId } = useMenu()
  const collectionId = collection.get('id')
  const collectionName = collection.get('shortTitle')

  const recipes = getRecipesForCollectionId(collectionId)
  const recipe = recipes.length ? recipes[0].recipe : null

  const onClick = useCallback(() => {
    if (!recipe) {
      return
    }

    changeCollectionById(collectionId)

    track({
      targetCollectionId: collectionId,
      recipeId: recipe.id,
    })
  }, [collectionId, recipe, changeCollectionById, track])

  if (!recipe) {
    return null
  }

  const imageURL = extractImageFromRecipe(recipe)

  return (
    <div
      role="button"
      tabIndex={0}
      className={css.collectionLinkTile}
      onClick={onClick}
      onKeyPress={onClick}
    >
      <div className={css.arrowRightWrapper}>
        <span className={css.arrowRight} />
      </div>

      <div className={css.collectionLinkInfo}>
        {imageURL && (
          <img className={css.collectionLinkImage} src={imageURL} alt={collectionName} />
        )}
        <span className={css.collectionLinkName}>{collectionName}</span>
        <span className={css.collectionLinkCount}>({recipes.length})</span>
      </div>
    </div>
  )
}
