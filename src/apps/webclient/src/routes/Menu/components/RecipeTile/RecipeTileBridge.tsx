import React, { useCallback, useMemo } from 'react'

import Immutable from 'immutable'
import { useDispatch } from 'react-redux'

import { RecipeTile as RecipeTileV2, RecipeTileDependencies } from '@features/recipe-tile'
import { Recipe } from '@library/api-menu-service'

import { actionTypes } from 'actions/actionTypes'
import { showDetailRecipe } from 'routes/Menu/actions/menuRecipeDetails'
import { useMakeOnCheckRecipe } from 'routes/Menu/components/RecipeAlternativeOptions/RecipeAlternativeOptions/useMakeOnCheckRecipe'
import { useTrackVariantListDisplay } from 'routes/Menu/components/RecipeAlternativeOptions/RecipeAlternativeOptions/useTracking'
import { useGetSurchargeForRecipeId } from 'routes/Menu/components/RecipeTile/Hooks'
import { useGetRecipeTileLinkData } from 'routes/Menu/components/RecipeTile/RecipeTileLink'
import { SwapAlternativeOptionsMobile } from 'routes/Menu/components/RecipeTile/SwapAlternativeOptions'
import {
  useRecipeBrandAvailabilityTag,
  useRecipeBrandTag,
  RecipeContextProvider,
} from 'routes/Menu/context/recipeContext'
import { useBasket } from 'routes/Menu/domains/basket'
import { useSetBrowserCTAVisibility, useMenu } from 'routes/Menu/domains/menu'
import { useStock } from 'routes/Menu/domains/stock'

import { RecipeReferenceProvider } from '../../context/recipeReferenceContext'
import { useTracking as useTrackSwapAlternativeOptions } from './SwapAlternativeOptions/useTracking'

type RecipeTileBridgeProps = {
  recipeReference: string | null
  recipe: Recipe
  originalId: string
  collectionId: string
}

/**
 *
 * Integrate the `RecipeTile` from the `recipe-tile` module into WebClient.
 *
 * ------
 *
 * **Context**
 *
 * As part of wider modularisatiom initiative `RecipeTile` compoenent was pulled
 * into it own "feature" module.
 *
 * While refactoring the `RecipeTile` related code into new place, some of
 * related complex logic was left in the WebClient. As it relies on patterns
 * and frameworks that were deliberately abandoned by new `RecipeTile` module:
 * global redux store, Immutable.js, enzyma etc.
 *
 * To ensure the new `RecipeTile` has access to that logic a pattern of hooks
 * "injection" was addopted. In which the complex logic is wrapped into hooks,
 * which are "injected" into `RecipeTile` module as React Contexts.
 *
 * There are quite a few such "contexts", hence the `RecipeTileBridge` component
 * with aim to abstract away "wiring" module based `RecipeTile` into the WebClient.
 *
 */
export const RecipeTileBridge = ({
  recipeReference,
  recipe,
  originalId,
  collectionId,
}: RecipeTileBridgeProps) => {
  const { getOptionsForRecipe } = useMenu()

  const useGetOptionsForRecipe = useCallback(
    () =>
      (args: {
        recipeId: string
        isOnDetailScreen: boolean

        categoryId?: string
      }) =>
        getOptionsForRecipe(args.recipeId, args.categoryId, {
          isOnDetailScreen: args.isOnDetailScreen,
        }),
    [getOptionsForRecipe],
  )

  const { trackRecipeAlternativeOptionsMenuOpen, trackRecipeAlternativeOptionsMenuSwapRecipes } =
    useTrackSwapAlternativeOptions()

  const dispatch = useDispatch()
  const onClick = useCallback((...args) => dispatch(showDetailRecipe(...args)), [dispatch])

  const useTracking = useCallback(
    () => ({
      useTrackVariantListDisplay,
      useTrackingSwapAlternativeOptions: () => ({
        trackRecipeAlternativeOptionsMenuOpen,
        trackRecipeAlternativeOptionsMenuSwapRecipes,
      }),
      track: (actionType: string, trackingPayload: any) =>
        dispatch({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType,
            ...trackingPayload,
          },
        }),
    }),
    [dispatch, trackRecipeAlternativeOptionsMenuOpen, trackRecipeAlternativeOptionsMenuSwapRecipes],
  )

  const useRecipeBrand = useCallback(
    () => ({
      useRecipeBrandAvailabilityTag,
      useRecipeBrandTag,
    }),
    [],
  )

  const memRecipeImmutable = useMemo(() => Immutable.fromJS(recipe), [recipe.id])
  const memRecipe = useMemo(() => recipe, [recipe.id])

  return (
    <RecipeReferenceProvider value={recipeReference}>
      <RecipeContextProvider value={memRecipeImmutable}>
        <RecipeTileDependencies
          recipe={memRecipe}
          useGetAlternativeOptionsForRecipe={useGetOptionsForRecipe}
          useStock={useStock}
          useBasket={useBasket}
          useSetBrowserCTAVisibility={useSetBrowserCTAVisibility}
          useTracking={useTracking}
          recipeReference={recipeReference}
          useGetSurchargeForRecipeId={useGetSurchargeForRecipeId}
          useRecipeBrand={useRecipeBrand}
          useGetRecipeTileLinkData={useGetRecipeTileLinkData}
          useMakeOnCheckRecipe={useMakeOnCheckRecipe}
        >
          <RecipeTileV2
            originalId={originalId}
            currentCollectionId={collectionId}
            onClick={onClick}
            SwapAlternativeOptionsMobile={() => (
              <SwapAlternativeOptionsMobile
                recipeId={recipe.id}
                originalId={originalId}
                categoryId={collectionId}
              />
            )}
          />
        </RecipeTileDependencies>
      </RecipeContextProvider>
    </RecipeReferenceProvider>
  )
}
