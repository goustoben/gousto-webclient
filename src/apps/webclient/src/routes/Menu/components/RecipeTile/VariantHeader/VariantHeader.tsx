import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useGetAlternativeOptionsForRecipeLight, useStock } from '../../../domains/menu'
import { useRecipeId } from '../../../context/recipeContext'
import css from './VariantHeader.css'

const LEAN_BEEF_OVERRIDES = [
  '390',
  '527',
  '941',
  '953',
  '1020',
  '1237',
  '1239',
  '1255',
  '1476',
  '1493',
  '1511',
  '1938',
  '2026',
  '2046',
  '2048',
  '2154',
  '2171',
  '2443',
  '2532',
  '2676',
  '2809',
  '3204',
]

const getTextOverride = (recipeId: string) => {
  if (LEAN_BEEF_OVERRIDES.includes(recipeId)) {
    return 'Swap for Lean Beef'
  }

  return null
}

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
    isFromShowcaseMenu: false,
  })

  // alternatives includes recipe itself, hence checking against `1`
  if (!alternatives || alternatives.length <= 1) {
    return null
  }

  const textOverride = getTextOverride(recipeId)
  const alternativeCount = alternatives.length
  const text = textOverride || `${alternativeCount} options available`

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
