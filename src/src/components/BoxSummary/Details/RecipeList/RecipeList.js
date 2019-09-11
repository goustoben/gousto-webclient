import { PropTypes } from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import { LayoutContentWrapper } from 'goustouicomponents'
import RecipeItem from 'Recipe/RecipeItem'
import ShortlistItem from 'Recipe/ShortlistItem'
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
  shortlistFeatureEnabled,
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
              showShortlistButton={shortlistFeatureEnabled}
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
      {shortlistFeatureEnabled &&
        <ShortlistItem
          available
          numPortions={numPortions}
          onImageClick={showRecipeDetailsOnClick}
        />
      }
    </div>
  )
}

RecipeList.propTypes = {
  basketRecipes: PropTypes.instanceOf(Immutable.Map),
  menuFetchPending: PropTypes.bool,
  numPortions: PropTypes.number,
  okRecipeIds: PropTypes.instanceOf(Immutable.Map),
  onRemove: PropTypes.func,
  orderSaveError: PropTypes.string,
  recipesStore: PropTypes.instanceOf(Immutable.Map),
  shortlistFeatureEnabled: PropTypes.bool,
  showRecipeDetailsOnClick: PropTypes.func,
  unavailableRecipeIds: PropTypes.instanceOf(Immutable.Map),
  basketRestorePreviousDate: PropTypes.func,
  clearSlot: PropTypes.func
}

export { RecipeList }
