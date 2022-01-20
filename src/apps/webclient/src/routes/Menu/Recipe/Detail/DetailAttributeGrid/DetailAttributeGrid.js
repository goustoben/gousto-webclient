import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'

import { getDietaryTags } from 'utils/recipe'

import { AttributeGridContainer } from '../../AttributeGrid'

const DetailAttributeGrid = ({ recipeId, isChefPrepared, recipe }) => {
  if (!recipe) {
    return null
  }

  const cals = recipe.getIn(['nutritionalInformation', 'perPortion', 'energyKcal'], 0)

  const dietaryTagSlugs = getDietaryTags(recipe)
  const dairyFree = dietaryTagSlugs.some(slug => slug === 'dairy-free')
  const glutenFree = dietaryTagSlugs.some(slug => slug === 'gluten-free')

  return (
    <AttributeGridContainer
      recipeId={recipeId}
      maxNoAttributes={20}
      showDetailedRecipe
      isChefPrepared={isChefPrepared}

      fiveADay={recipe.get('fiveADay')}
      cals={cals}
      cuisine={recipe.get('cuisine')}
      glutenFree={glutenFree}
      dairyFree={dairyFree}
    />
  )
}

DetailAttributeGrid.propTypes = {
  recipeId: PropTypes.string.isRequired,
  isChefPrepared: PropTypes.bool.isRequired,
  recipe: ImmutablePropTypes.map.isRequired
}

export { DetailAttributeGrid }
