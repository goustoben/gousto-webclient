import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Item from 'Item'
import { LayoutContentWrapper } from 'goustouicomponents'
import { isAvailableRecipeList } from 'utils/recipe'
import { UnavailableMessage } from '../UnavailableMessage'
import css from '../Details.css'

class RecipeList extends React.PureComponent {
  componentDidMount() {
    const { trackingUnavailableRecipeList, menuFetchPending, unavailableRecipeIds, recipesStore } = this.props
    const unavailableRecipeList = isAvailableRecipeList(unavailableRecipeIds, recipesStore)

    if (unavailableRecipeList.size > 0 && !menuFetchPending) {
      trackingUnavailableRecipeList(unavailableRecipeList)
    }
  }

  render() {
    const {
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
    } = this.props
    const okRecipeList = isAvailableRecipeList(okRecipeIds, recipesStore)
    const unavailableRecipeList = isAvailableRecipeList(unavailableRecipeIds, recipesStore)

    return (
      <div>
        <LayoutContentWrapper>
          <div className={css.recipeItems}>
            {okRecipeList.map(recipe => (
              <Item
                key={recipe.get('id')}
                type="recipe"
                available
                fromBox
                media={recipe.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))}
                onImageClick={() => showRecipeDetailsOnClick(recipe.get('id'))}
                onRemove={() => onRemove(recipe.get('id'), 'boxSummaryMinus')}
                quantity={basketRecipes.get(recipe.get('id')) * numPortions}
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
              <Item
                key={recipe.get('id')}
                type="recipe"
                available={menuFetchPending}
                media={recipe.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))}
                onImageClick={() => showRecipeDetailsOnClick(recipe.get('id'))}
                onRemove={() => onRemove(recipe.get('id'), 'boxSummaryMinus')}
                quantity={basketRecipes.get(recipe.get('id')) * numPortions}
                title={recipe.get('title')}
              />
            )).toArray()}
          </div>
        </LayoutContentWrapper>
      </div>
    )
  }
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
  clearSlot: PropTypes.func.isRequired,
  trackingUnavailableRecipeList: PropTypes.func.isRequired,
}

export { RecipeList }
