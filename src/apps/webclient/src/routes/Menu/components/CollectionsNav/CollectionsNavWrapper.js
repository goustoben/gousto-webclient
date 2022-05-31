import React from 'react'

import classnames from 'classnames'
import { useSelector } from 'react-redux'

import { useDoubleDeckerNav } from 'hooks/useDoubleDeckerNav'
import { getIsPolicyAccepted } from 'selectors/cookies'

import { useCollections } from '../../domains/collections'
import { CollectionsNav } from './CollectionsNav'

import css from './CollectionsNav.css'

const CollectionsNavWrapper = (ownProps) => {
  const { currentCollectionId, collections, changeCollectionById } = useCollections()
  const isPolicyAccepted = useSelector(getIsPolicyAccepted)
  const doubleDeckerExperimentEnabled = useDoubleDeckerNav()

  return (
    <div
      className={classnames({
        [css.doubleDeckerCollectionsNavWrapper]: doubleDeckerExperimentEnabled,
      })}
    >
      <CollectionsNav
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...ownProps}
        changeCollectionById={changeCollectionById}
        menuCollections={collections}
        menuCurrentCollectionId={currentCollectionId}
        isPolicyAccepted={isPolicyAccepted}
        doubleDeckerExperimentEnabled={doubleDeckerExperimentEnabled}
      />
    </div>
  )
}

export { CollectionsNavWrapper }
