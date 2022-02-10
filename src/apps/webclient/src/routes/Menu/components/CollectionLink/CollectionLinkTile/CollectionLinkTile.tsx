import React, { useCallback } from 'react'
import css from './CollectionLinkTile.css'
import { useMenu } from '../../../domains/menu'
import { useCollections } from '../../../domains/collections'
import { MenuCollection } from '../../../types'

type CollectionLinkProps = {
  collection: MenuCollection
}

const CollectionLinkTile: React.FC<CollectionLinkProps> = ({ collection }) => {
  const { changeCollectionById } = useCollections()
  const { getRecipesForCollectionId } = useMenu()
  const collectionId = collection.get('id')
  const collectionName = collection.get('shortTitle')
  const numberOfRecipesInCollection = getRecipesForCollectionId(collection.get('id'))?.recipes?.size
  const imageURL =
    'https://production-media.gousto.co.uk/cms/mood-image/1457-Butternut-Squash--Coconut-Dal-x700.jpg'

  const onClick = useCallback(() => changeCollectionById(collectionId), [collectionId])

  if (!numberOfRecipesInCollection) {
    return null
  }

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
        <img className={css.collectionLinkImage} src={imageURL} alt={collectionName} />
        <p className={css.collectionLinkName}>{collectionName}</p>
        <p className={css.collectionLinkCount}>({numberOfRecipesInCollection})</p>
      </div>
    </div>
  )
}

export { CollectionLinkTile }
