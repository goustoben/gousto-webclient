import React from 'react'

import styled from "@emotion/styled";

import { useRecipe, useStockHook } from '../../../model/context'
import { cssOverlay, cssOverlayText } from './styles';

const OverlayDiv = styled.div(cssOverlay as any)
const OverlayText = styled.span(cssOverlayText as any)

export function SoldOutOverlay() {
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
    <OverlayDiv>
      <OverlayText>This recipe is sold out for your delivery date</OverlayText>
    </OverlayDiv>
  )
}
