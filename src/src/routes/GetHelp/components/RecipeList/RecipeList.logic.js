import React from 'react'
import PropTypes from 'prop-types'
import { InputCheck, ItemExpandable } from 'goustouicomponents'
import { List } from "../List"

const propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
        })
      )
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
}

const Recipe = ({ recipe, selectedIngredients, onChange }) => {
  const ingredientList = recipe.ingredients.map((ingredient) => {
    const isChecked = selectedIngredients.get(`${recipe.id}-${ingredient.id}`) || false

    return (
      <InputCheck
        key={ingredient.id}
        id={`${recipe.id}-${ingredient.id}`}
        label={ingredient.label}
        isChecked={isChecked}
        onChange={onChange}
      />
    )
  })

  return (
    <ItemExpandable
      key={recipe.id}
      label={recipe.title}
    >
      {ingredientList}
    </ItemExpandable>
  )
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      })
    )
  }),
  onChange: PropTypes.func.isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
}

const RecipeList = ({ recipes, selectedIngredients, onChange }) => {
  const recipeList = recipes.map((recipe) => (
    <Recipe
      key={recipe.id}
      recipe={recipe}
      selectedIngredients={selectedIngredients}
      onChange={onChange}
    />
  ))

  return (
    <List>
      {recipeList}
    </List>
  )
}

RecipeList.propTypes = propTypes

export {
  RecipeList
}
