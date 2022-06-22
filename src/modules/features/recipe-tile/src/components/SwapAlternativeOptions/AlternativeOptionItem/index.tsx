import React from 'react'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { ItemContent } from './ItemContent'
import { cssListItem, cssListItemChecked } from './styles';
import { Radio } from '@gousto-internal/citrus-react';

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
    <Radio
      id={recipeId}
      value={recipeId}
      name="variantList"
      onChange={() => changeCheckedRecipe(recipeId, isOutOfStock)}
      checked={isChecked}
    >
      <ItemContent
        recipeName={recipeName}
        isOutOfStock={isOutOfStock}
        surcharge={surcharge}
      />
    </Radio>
  </li>
)
