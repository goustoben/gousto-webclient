import React from 'react'
import { useSelector } from 'react-redux'
import { getIsPolicyAccepted } from 'selectors/cookies'
import { useDoubleDeckerNav } from 'hooks/useDoubleDeckerNav'
import { useCollections } from '../../domains/collections'
import { CollectionsNav } from './CollectionsNav'

const CollectionsNavWrapper = (ownProps) => {
  const { currentCollectionId, collections, changeCollectionById } = useCollections()
  const isPolicyAccepted = useSelector(getIsPolicyAccepted)
  const doubleDeckerExperimentEnabled = useDoubleDeckerNav()

  return (
    <CollectionsNav
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      changeCollectionById={changeCollectionById}
      menuCollections={collections}
      menuCurrentCollectionId={currentCollectionId}
      isPolicyAccepted={isPolicyAccepted}
      doubleDeckerExperimentEnabled={doubleDeckerExperimentEnabled}
    />
  )
}

export { CollectionsNavWrapper }
