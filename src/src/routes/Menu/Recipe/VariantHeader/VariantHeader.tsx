import React from 'react'
import PropTypes from 'prop-types'
import { useGetAlternativeOptionsForRecipeLight, useStock } from 'routes/Menu/domains/menu'
import css from './VariantHeader.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const classnames = require('classnames')

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
  recipeId: string;
  categoryId: string;
  originalId: string;
}> = ({ recipeId, categoryId, originalId }) => {
  const { isRecipeOutOfStock } = useStock()
  const isOutOfStock = isRecipeOutOfStock(recipeId)
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipeLight()

  const alternatives = getAlternativeOptionsForRecipe({
    recipeId,
    originalId,
    categoryId,
    isOnDetailScreen: false,
    isFromShowcaseMenu: false,
  })

  const textOverride = getTextOverride(recipeId)

  // alternatives includes recipe itself, hence checking against `1`
  if (!alternatives || alternatives.length <= 1 || isOutOfStock) {
    return null
  }

  const alternativeCount = alternatives.length
  const text = textOverride || `${alternativeCount} options available`

  return (
    <div
      className={classnames(
        css.variantHeader,
        css.themeBlue,
        css.positionTop,
        css.textLeft
      )}
    >
      {text}
    </div>
  )
}

VariantHeader.propTypes = {
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
}
