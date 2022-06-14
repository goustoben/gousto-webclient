import React from 'react'

import classnames from 'classnames'
import { InputRadio } from 'goustouicomponents'

import { ItemContent } from './ItemContent'

import css from './AlternativeOptionItem.css'

type AlternativeOptionItemProps = {
  recipeId: string
  recipeName: string
  changeCheckedRecipe: () => void
  isChecked: boolean
  isOnDetailScreen: boolean
  isOutOfStock: boolean
  surcharge?: number | null
}

export const AlternativeOptionItem = ({
  recipeId,
  recipeName,
  changeCheckedRecipe,
  isChecked,
  isOnDetailScreen,
  isOutOfStock,
  surcharge = null,
}: AlternativeOptionItemProps) => (
  <li className={classnames(css.listItem, { [css.listItemChecked]: isChecked })}>
    <InputRadio
      id={recipeId}
      value={recipeId}
      name="variantList"
      onChange={changeCheckedRecipe}
      isChecked={isChecked}
    >
      <ItemContent
        recipeName={recipeName}
        isOnDetailScreen={isOnDetailScreen}
        isOutOfStock={isOutOfStock}
        surcharge={surcharge}
      />
    </InputRadio>
  </li>
)
