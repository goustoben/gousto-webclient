import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import { LayoutContentWrapper } from 'goustouicomponents'
import RecipeItem from 'routes/Menu/Recipe/RecipeItem'
import { isAvailableRecipeList } from 'utils/recipe'
import { UnavailableMessage } from '../UnavailableMessage'
import css from '../Details.css'

const RecipeList = ({
  basketRecipes,
  menuFetchPending,
  numPortions,
  okRecipeIds,
  onRemove,
  orderSaveError,
  recipesStore,
  showRecipeDetailsOnClick,
  unavailableRecipeIds,
  basketRestorePreviousDate,
  clearSlot
}) => {
  const okRecipeList = isAvailableRecipeList(okRecipeIds, recipesStore)
  const unavailableRecipeList = isAvailableRecipeList(unavailableRecipeIds, recipesStore)

  return (
    <div>
      <LayoutContentWrapper>
        <div className={css.recipeItems}>
          {okRecipeList.map(recipe => (
            <RecipeItem
              key={recipe.get('id')}
              available
              fromBox
              media={recipe.get('media')}
              numPortions={basketRecipes.get(recipe.get('id')) * numPortions}
              onImageClick={() => showRecipeDetailsOnClick(recipe.get('id'))}
              onRemove={() => onRemove(recipe.get('id'), 'boxSummaryMinus')}
              recipeId={recipe.get('id')}
              title={recipe.get('title')}
            />
          )).toArray()}

          <UnavailableMessage
            basketRestorePreviousDate={basketRestorePreviousDate}
            clearSlot={clearSlot}
            unavailableRecipeList={unavailableRecipeList}
            menuFetchPending={menuFetchPending}
            orderSaveError={orderSaveError}
          />

          {unavailableRecipeList.map(recipe => (
            <RecipeItem
              key={recipe.get('id')}
              available={menuFetchPending}
              media={recipe.get('media')}
              numPortions={basketRecipes.get(recipe.get('id')) * numPortions}
              onImageClick={() => showRecipeDetailsOnClick(recipe.get('id'))}
              onRemove={() => onRemove(recipe.get('id'), 'boxSummaryMinus')}
              title={recipe.get('title')}
            />
          )).toArray()}
        </div>
      </LayoutContentWrapper>
    </div>
  )
}

RecipeList.propTypes = {
  basketRecipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  menuFetchPending: PropTypes.bool.isRequired,
  numPortions: PropTypes.number.isRequired,
  okRecipeIds: PropTypes.instanceOf(Immutable.Map).isRequired,
  onRemove: PropTypes.func.isRequired,
  orderSaveError: PropTypes.string.isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  showRecipeDetailsOnClick: PropTypes.func.isRequired,
  unavailableRecipeIds: PropTypes.instanceOf(Immutable.Map).isRequired,
  basketRestorePreviousDate: PropTypes.func.isRequired,
  clearSlot: PropTypes.func.isRequired
}

export { RecipeList }
