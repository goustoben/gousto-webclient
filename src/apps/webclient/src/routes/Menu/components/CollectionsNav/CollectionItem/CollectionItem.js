import PropTypes from 'prop-types'
import React from 'react'
import { useDoubleDeckerNav } from 'hooks/useDoubleDeckerNav'
import classnames from 'classnames'
import { useMenu } from 'routes/Menu/domains/menu'

import css from './CollectionItem.css'

const CollectionItem = ({
  collectionId,
  className,
  dataId,
  onClick,
  identifier,
  element,
  children,
  slug,
}) => {
  const { getRecipesForCollectionId } = useMenu()
  const count = getRecipesForCollectionId(collectionId).recipes.size
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

CollectionItem.propTypes = {
  collectionId: PropTypes.string.isRequired,
  dataId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  identifier: PropTypes.string.isRequired,
  element: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  slug: PropTypes.string.isRequired,
}

export { CollectionItem }
