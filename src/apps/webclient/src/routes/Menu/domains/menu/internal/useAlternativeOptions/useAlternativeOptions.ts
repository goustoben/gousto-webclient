import * as Immutable from 'immutable'
import { useSelector, RootStateOrAny } from 'react-redux'

import { useRecipeReference } from 'routes/Menu/context/recipeReferenceContext'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import {
  getSurchargeForRecipe,
  getVariantsForRecipeForCurrentCollection,
} from 'routes/Menu/selectors/recipe'
import { getInStockRecipes } from 'routes/Menu/selectors/recipeList'
import { getCurrentMenuVariants } from 'routes/Menu/selectors/variants'
import { getNumPortions } from 'selectors/basket'
import { getRecipeTitle } from 'selectors/recipe'
import { getRecipes } from 'selectors/root'

import { Recipe, RecipeImmutable, CollectionImmutable } from './types'

const compareCoreRecipeIds = (a: Recipe, b: Recipe) =>
  parseInt(a.coreRecipeId, 10) - parseInt(b.coreRecipeId, 10)

type GetAlternativeOptionsForRecipeArgs = {
  /**
   * ID of recipe (alternative option) that is already selected
   */
  recipeId: string
  isOnDetailScreen: boolean

  categoryId?: string
}

type UseAlternativeOptionsArgs = { allCollections?: AllCollections }
type AllCollections = Immutable.Map<string, CollectionImmutable>

export function useAlternativeOptions({ allCollections }: UseAlternativeOptionsArgs = {}) {
  const recipesVariants = useSelector<RootStateOrAny, { [k: Recipe['id']]: Recipe }>(
    getCurrentMenuVariants,
  )
  const recipes = useSelector<RootStateOrAny, RecipeImmutable[]>(getCurrentMenuRecipes)
  const allRecipesAsMap = useSelector(getRecipes)
  const recipesInStock = useSelector(getInStockRecipes)
  const recipesInStockIds = new Set(
    recipesInStock.map((r: Immutable.Map<string, string>) => r.get('id')),
  )
  const numPortions = useSelector(getNumPortions)
  const recipeReference = useRecipeReference()

  function getAlternativeOptionsForRecipe({
    recipeId,
    categoryId: collectionId,
    isOnDetailScreen,
  }: GetAlternativeOptionsForRecipeArgs) {
    if (!collectionId) {
      throw new Error(
        `Failed to obtain collectionId while determining Alternative Options for ${recipeId} recipe`,
      )
    }

    const dietaryClaims = allCollections
      ? allCollections.getIn([collectionId, 'requirements', 'dietary_claims'], null)
      : null

    const recipeAlternativeOptions = getVariantsForRecipeForCurrentCollection(
      recipesVariants,
      recipeId,
      recipes,
      dietaryClaims,
    )
    const recipeVariantsArray = recipeAlternativeOptions
      ? recipeAlternativeOptions.variantsList.toJS()
      : []

    const selectedRecipe = recipeId ? recipes.find((r) => r.get('id') === recipeId) : null

    const options = [
      ...(selectedRecipe
        ? [
            {
              displayName: getRecipeTitle(selectedRecipe),
              coreRecipeId: selectedRecipe.get('coreRecipeId'),
            },
          ]
        : []),
      ...recipeVariantsArray,
    ].sort(compareCoreRecipeIds)

    return options.map(({ coreRecipeId, displayName }) => {
      const surcharge = getSurchargeForRecipe(coreRecipeId, numPortions, allRecipesAsMap)

      return {
        recipeReference,
        recipeId: coreRecipeId,
        recipeName: displayName,
        isChecked: String(recipeId) === String(coreRecipeId),
        isOnDetailScreen,
        isOutOfStock: !recipesInStockIds.has(coreRecipeId),
        surcharge,
      }
    })
  }

  return {
    getAlternativeOptionsForRecipe,
  }
}
