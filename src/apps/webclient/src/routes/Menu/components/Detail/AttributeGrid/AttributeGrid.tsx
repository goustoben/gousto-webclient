import React from 'react'

import classnames from 'classnames'

import { RecipeAttribute } from './RecipeAttribute'
import { useAttributes } from './useAttributes'

import css from './AttributeGrid.css'

type AttributeGridProps = {
  maxNoAttributes?: number
}

export const AttributeGrid = ({ maxNoAttributes = 20 }: AttributeGridProps) => {
  const attributes = useAttributes({ maxNoAttributes })

  if (attributes.length === 0) {
    return null
  }

  return (
    <div className={classnames(css.attributes)}>
      {attributes.map(({ name, value, icon }) => (
        <RecipeAttribute key={name} name={name} value={value} icon={icon} />
      ))}
    </div>
  )
}
