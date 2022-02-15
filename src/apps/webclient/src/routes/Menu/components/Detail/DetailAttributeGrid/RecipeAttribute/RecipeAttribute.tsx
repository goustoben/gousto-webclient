import React from 'react'
import Svg from 'Svg'
import css from './RecipeAttribute.css'
import { getDescription } from './config'

type RecipeAttributeProps = {
  icon: string
  name: Parameters<typeof getDescription>[0]
  value: string | number | boolean
}

export const RecipeAttribute = ({ icon, name, value }: RecipeAttributeProps) => (
  <div className={css.attribute}>
    <Svg fileName={icon} className={css.icon} />
    <span className={css.description}>
      {'  '}
      {getDescription(name, value)}
    </span>
  </div>
)
