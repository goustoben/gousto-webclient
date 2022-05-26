import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { useRecipeId } from '../../../context/recipeContext'
import { useGetAlternativeOptionsForRecipeLight, useStock } from '../../../domains/menu'

import css from './VariantHeader.css'

export const VariantHeader: React.FC<{
  categoryId: string
  originalId: string
}> = ({ categoryId, originalId }) => {
  const { isRecipeOutOfStock } = useStock()
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipeLight()
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
    originalId,
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
  originalId: PropTypes.string.isRequired,
}
