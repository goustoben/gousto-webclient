import React from 'react'

import classnames from 'classnames'

import { useDoubleDeckerNav } from 'hooks/useDoubleDeckerNav'
import { useMenu } from 'routes/Menu/domains/menu'

import css from './CollectionItem.css'

type CollectionItemProps = {
  collectionId: string
  dataId: string
  className: string
  onClick(...args: unknown[]): unknown
  identifier: string
  element(...args: unknown[]): unknown
  children: React.ReactNode
  slug: string
}

export function CollectionItem({
  collectionId,
  className,
  dataId,
  onClick,
  identifier,
  element,
  children,
  slug,
}: CollectionItemProps) {
  const { getRecipesForCollectionId } = useMenu()

  // No selectedVariants as they do not influence counter
  const count = getRecipesForCollectionId(collectionId).length
  const doubleDeckerExperimentEnabled = useDoubleDeckerNav()

  return (
    <div
      data-id={dataId}
      className={className}
      onClick={onClick}
      key={identifier}
      ref={element}
      data-slug={slug}
    >
      {children}
      <span
        className={classnames({
          [css.count]: !doubleDeckerExperimentEnabled,
          [css.doubleDeckerCount]: doubleDeckerExperimentEnabled,
        })}
      >
        ({count})
      </span>
    </div>
  )
}
