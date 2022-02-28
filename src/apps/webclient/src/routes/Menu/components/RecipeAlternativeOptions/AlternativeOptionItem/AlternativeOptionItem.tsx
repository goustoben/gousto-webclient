import React from 'react'
import { InputRadio } from 'goustouicomponents'
import classnames from 'classnames'
import { ItemContent } from './ItemContent'
import css from './AlternativeOptionItem.css'

type AlternativeOptionItemProps = {
  recipeId: string
  recipeName: string
  changeCheckedRecipe: (recipeId: string, isOutOfStock: boolean) => void
  isChecked: boolean
  isOnDetailScreen: boolean
  isOutOfStock: boolean
  surcharge: number | null
  isFromShowcaseMenu?: boolean
}

export const AlternativeOptionItem = ({
  recipeId,
  recipeName,
  changeCheckedRecipe,
  isChecked,
  isOnDetailScreen,
  isOutOfStock,
  surcharge,
  isFromShowcaseMenu,
}: AlternativeOptionItemProps) => (
  <li className={classnames(css.listItem, { [css.listItemChecked]: isChecked })}>
    <InputRadio
      id={recipeId}
      value={recipeId}
      name="variantList"
      onChange={() => changeCheckedRecipe(recipeId, isOutOfStock)}
      isChecked={isChecked}
    >
      <ItemContent
        recipeName={recipeName}
        isOnDetailScreen={isOnDetailScreen}
        isOutOfStock={isOutOfStock}
        surcharge={surcharge}
        isFromShowcaseMenu={isFromShowcaseMenu}
      />
    </InputRadio>
  </li>
)
