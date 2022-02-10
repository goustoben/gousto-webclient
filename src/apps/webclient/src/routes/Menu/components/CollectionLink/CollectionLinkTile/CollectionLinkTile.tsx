import React, { useCallback } from 'react'
import Immutable from 'immutable'
import css from './CollectionLinkTile.css'
import { useMenu } from '../../../domains/menu'
import { useCollections } from '../../../domains/collections'
import { MenuCollection } from '../../../types'
import { findImageUrls } from '../../Recipe/Image/findImageUrls'
import { getDefaultImage } from '../../Recipe/Image/useRecipeImage'

const extractImageFromRecipe = (recipe: any): string => {
  const images = recipe?.recipe?.getIn(['media', 'images']) || Immutable.List()
  const imageUrls = findImageUrls(images)
  const imageURL = getDefaultImage(imageUrls)

  return imageURL
}

type CollectionLinkProps = {
  collection: MenuCollection
}

const CollectionLinkTile: React.FC<CollectionLinkProps> = ({ collection }) => {
  const { changeCollectionById } = useCollections()
  const { getRecipesForCollectionId } = useMenu()
  const collectionId = collection.get('id')
  const collectionName = collection.get('shortTitle')
  const numberOfRecipesInCollection = getRecipesForCollectionId(collection.get('id'))?.recipes?.size

  const onClick = useCallback(() => changeCollectionById(collectionId), [collectionId])

  if (!numberOfRecipesInCollection) {
    return null
  }

  const recipe = getRecipesForCollectionId(collection.get('id')).recipes.first()
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
        <p className={css.collectionLinkCount}>({numberOfRecipesInCollection})</p>
      </div>
    </div>
  )
}

export { CollectionLinkTile }
