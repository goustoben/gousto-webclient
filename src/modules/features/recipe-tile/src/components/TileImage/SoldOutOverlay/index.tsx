import React from 'react'

import { css } from "@emotion/react";

import { useRecipe, useStockHook } from '../../../model/context'
import { cssOverlay, cssOverlayText } from './styles';

export const SoldOutOverlay: React.FC = () => {
  const useStock = useStockHook()
  const { isRecipeOutOfStock } = useStock()
  const { id: recipeId } = useRecipe()

  if (!recipeId) {
    return null
  }

  const isOutOfStock = isRecipeOutOfStock(recipeId)

  if (!isOutOfStock) {
    return null
  }

  return (
    <div css={css(cssOverlay)}>
      <span css={css(cssOverlayText)}>This recipe is sold out for your delivery date</span>
    </div>
  )
}
