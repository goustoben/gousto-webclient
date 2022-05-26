import React from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { NutritionInfo } from '../Nutrition'
import { NutritionDisclaimerText } from '../NutritionDisclaimerText'
import { RecipeMicronutrientsContainer } from '../RecipeMicronutrients'

import css from '../Detail.css'

const DetailPerPortion = ({ recipeId, perPortion, per100Grams }) => {
  if (!perPortion || !perPortion.size) {
    return null
  }

  return (
    <div className={css.sectionPanel}>
      <NutritionInfo perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} />
      <RecipeMicronutrientsContainer id={recipeId} />
      <NutritionDisclaimerText />
    </div>
  )
}

DetailPerPortion.propTypes = {
  recipeId: PropTypes.string.isRequired,
  perPortion: PropTypes.instanceOf(Immutable.Map).isRequired,
  per100Grams: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export { DetailPerPortion }
