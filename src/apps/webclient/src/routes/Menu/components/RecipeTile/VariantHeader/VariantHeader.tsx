import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { useRecipeId } from '../../../context/recipeContext'
import { useStock } from '../../../domains/basket'
import { useGetAlternativeOptionsForRecipe } from '../../../domains/menu'

import css from './VariantHeader.css'

export const VariantHeader = ({ categoryId }: { categoryId: string }) => {
  const { isRecipeOutOfStock } = useStock()
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe()
  const recipeId = useRecipeId()

  if (!recipeId) {
    return null
  }

  const isOutOfStock = isRecipeOutOfStock(recipeId)

  if (isOutOfStock) {
    return null
  }

  const alternatives = getAlternativeOptionsForRecipe({
    recipeId,
    categoryId,
    isOnDetailScreen: false,
  })

  // alternatives includes recipe itself, hence checking against `1`
  if (!alternatives || alternatives.length <= 1) {
    return null
  }

  const alternativeCount = alternatives.length
  const text = `${alternativeCount} options available`

  return (
    <div className={classnames(css.variantHeader, css.themeBlue, css.positionTop, css.textLeft)}>
      {text}
    </div>
  )
}

VariantHeader.propTypes = {
  categoryId: PropTypes.string.isRequired,
}
