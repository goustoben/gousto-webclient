import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { RecipeContextProvider } from 'routes/Menu/context/recipeContext'
import { RecipeTileContainer } from 'routes/Menu/components/RecipeTile'

import css from './RecipeList.css'

const RecipeList = ({ collectionId, recipes }) => (
  <div className={css.recipeList}>
    {recipes.map(({recipe, originalId}) => (
      <RecipeContextProvider key={recipe.get('id')} value={recipe}>
        <RecipeTileContainer
          recipeId={recipe.get('id')}
          originalId={originalId}
          categoryId={collectionId}
        />
      </RecipeContextProvider>
    ))}
  </div>
)

RecipeList.propTypes = {
  collectionId: PropTypes.string.isRequired,
  recipes: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string,
    })
  ).isRequired,
}

export { RecipeList }
