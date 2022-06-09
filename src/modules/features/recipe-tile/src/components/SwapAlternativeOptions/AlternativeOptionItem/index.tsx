import React from 'react'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { ItemContent } from './ItemContent'
import { cssListItem, cssListItemChecked } from './styles';
import { InputRadio } from './InputRadio';

type AlternativeOptionItemProps = {
  recipeId: string
  recipeName: string
  changeCheckedRecipe: (recipeId: string, isOutOfStock: boolean) => void
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
  isOutOfStock,
  surcharge = null,
}: AlternativeOptionItemProps) => (
  <li css={css(cssListItem, isChecked ? cssListItemChecked : null)}>
    <InputRadio
      id={recipeId}
      value={recipeId}
      name="variantList"
      onChange={() => changeCheckedRecipe(recipeId, isOutOfStock)}
      isChecked={isChecked}
    >
      <ItemContent
        recipeName={recipeName}
        isOutOfStock={isOutOfStock}
        surcharge={surcharge}
      />
    </InputRadio>
  </li>
)
