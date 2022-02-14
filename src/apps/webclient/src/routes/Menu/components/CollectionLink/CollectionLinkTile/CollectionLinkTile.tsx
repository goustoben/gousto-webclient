import React, { useCallback } from 'react'
import Immutable from 'immutable'
import css from './CollectionLinkTile.css'
import { useMenu } from '../../../domains/menu'
import { useCollections } from '../../../domains/collections'
import { MenuCollection } from '../../../types'
import { findImageUrls } from '../../Recipe/Image/findImageUrls'
import { getDefaultImage } from '../../Recipe/Image/useRecipeImage'
import { useTracking } from "./tracking"

const extractImageFromRecipe = (recipe: Immutable.Map<string, string>): string => {
  const images = recipe.getIn(['media', 'images']) || Immutable.List()
  const imageUrls = findImageUrls(images)
  const imageURL = getDefaultImage(imageUrls)

  return imageURL
}

type CollectionLinkProps = {
  collection: MenuCollection
}

const CollectionLinkTile: React.FC<CollectionLinkProps> = ({ collection }) => {
  const track = useTracking()
  const { changeCollectionById } = useCollections()
  const { getRecipesForCollectionId } = useMenu()
  const collectionId = collection.get('id')
  const collectionName = collection.get('shortTitle')

  const recipes = getRecipesForCollectionId(collectionId).recipes
  const recipe = (recipes.size) ? recipes.first().recipe : null

  const onClick = useCallback(() => {
    if (!recipe) {
      return
    }

    changeCollectionById(collectionId)

    track({
      targetCollectionId: collectionId,
      recipeId: recipe.get('id'),
    })
  }, [collectionId, recipe])

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
        <p className={css.collectionLinkName}>{collectionName}</p>
        <p className={css.collectionLinkCount}>({recipes.size})</p>
      </div>
    </div>
  )
}

export { CollectionLinkTile }
