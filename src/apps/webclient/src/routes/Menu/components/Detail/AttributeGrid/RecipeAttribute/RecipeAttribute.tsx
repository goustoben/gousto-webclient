import React from 'react'

import Svg from 'components/Svg'

import { getDescription, VisibleAttribute } from './config'

import css from './RecipeAttribute.css'

type RecipeAttributeProps = {
  icon: string
  name: VisibleAttribute
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
