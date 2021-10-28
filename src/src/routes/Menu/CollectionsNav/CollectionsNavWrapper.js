import React from 'react'
import { useSelector } from 'react-redux'
import { getIsPolicyAccepted } from 'selectors/cookies'
import { useCollections } from '../domains/collections'
import { CollectionsNav } from './CollectionsNav'

const CollectionsNavWrapper = (ownProps) => {
  const {
    currentCollectionId,
    collections,
    changeCollectionById
  } = useCollections()
  const isPolicyAccepted = useSelector(getIsPolicyAccepted)

  return (
    <CollectionsNav
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      collectionFilterChange={changeCollectionById}
      menuCollections={collections}
      menuCurrentCollectionId={currentCollectionId}
      isPolicyAccepted={isPolicyAccepted}
    />
  )
}

export { CollectionsNavWrapper }
