import React from 'react'

import { useBasket } from 'routes/Menu/domains/basket'
import { useStock } from 'routes/Menu/domains/stock'

import { useRecipeId } from '../../../context/recipeContext'

import css from './SoldOutOverlay.css'

export const SoldOutOverlay = () => {
  const { isRecipeOutOfStock } = useStock()
  const { numPortions } = useBasket()
  const recipeId = useRecipeId()

  if (!recipeId) {
    return null
  }

  const isOutOfStock = isRecipeOutOfStock(recipeId, numPortions)

  if (!isOutOfStock) {
    return null
  }

  return (
    <div className={css.overlay}>
      <span className={css.overlayText}>This recipe is sold out for your delivery date</span>
    </div>
  )
}
