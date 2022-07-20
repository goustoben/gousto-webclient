import React from 'react'

import { useRecipeId } from '../../../context/recipeContext'
import { useStock } from '../../../domains/basket'

import css from './SoldOutOverlay.css'

export const SoldOutOverlay: React.FC = () => {
  const { isRecipeOutOfStock } = useStock()
  const recipeId = useRecipeId()

  if (!recipeId) {
    return null
  }

  const isOutOfStock = isRecipeOutOfStock(recipeId)

  if (!isOutOfStock) {
    return null
  }

  return (
    <div className={css.overlay}>
      <span className={css.overlayText}>This recipe is sold out for your delivery date</span>
    </div>
  )
}
