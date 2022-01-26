import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Ingredient } from './Ingredient'

const propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    ingredientUuid: PropTypes.string,
    label: PropTypes.string,
    srcSet: PropTypes.string
  })).isRequired
}
const IngredientsList = ({ingredients}) => (
  <Fragment>
    {
      ingredients.map(({ ingredientUuid, label, srcSet}) => (
        <Ingredient key={ingredientUuid} label={label} srcSet={srcSet} />))
    }
  </Fragment>
)

IngredientsList.propTypes = propTypes
export { IngredientsList }
