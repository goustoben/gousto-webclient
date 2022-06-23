import React from 'react'
import styled from '@emotion/styled'

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

const ItemContainer = styled.li((props: any) => ({ ...cssListItem, ...(props.isChecked ? cssListItemChecked : {}) }) as any)

export const AlternativeOptionItem = ({
  recipeId,
  recipeName,
  changeCheckedRecipe,
  isChecked,
  isOutOfStock,
  surcharge = null,
}: AlternativeOptionItemProps) => (
  <ItemContainer isChecked={isChecked}>
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
  </ItemContainer>
)
