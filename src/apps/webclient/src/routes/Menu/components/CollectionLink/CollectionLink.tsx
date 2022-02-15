import React from 'react'
import { CollectionLinkTile } from './CollectionLinkTile'
import { useDietaryCollections } from './useDietaryCollections'
import css from './CollectionLink.css'

const CollectionLink = () => {
  const dietaryCollections = useDietaryCollections()

  if (!dietaryCollections || dietaryCollections.size === 0) {
    return null
  }

  return (
    <div className={css.collectionLink} data-testing-id="collection-link">
      <div className={css.collectionLinkContainer}>
        <div className={css.collectionLinkTitle}>
          <h2 className={css.collectionLinkHeading}>Looking for something?</h2>
          <p className={css.collectionLinkDescription}>
            Explore categories to find the perfect recipes.
          </p>
        </div>
        <div className={css.collectionLinkList} role="list">
          {dietaryCollections
            .toList()
            .map(
              (collection) =>
                !!collection && (
                  <CollectionLinkTile key={collection.get('id')} collection={collection} />
                )
            )}
        </div>
      </div>
    </div>
  )
}

export { CollectionLink }
