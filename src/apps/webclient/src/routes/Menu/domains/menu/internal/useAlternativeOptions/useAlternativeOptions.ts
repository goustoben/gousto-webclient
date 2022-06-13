import * as Immutable from 'immutable'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'

import { useRecipeReference } from 'routes/Menu/context/recipeReferenceContext'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import { getMenuCategoryIdForDetails } from 'routes/Menu/selectors/menuRecipeDetails'
import {
  getSurchargeForRecipe,
  getVariantsForRecipeForCurrentCollection,
} from 'routes/Menu/selectors/recipe'
import { getInStockRecipes } from 'routes/Menu/selectors/recipeList'
import { getCurrentMenuVariants } from 'routes/Menu/selectors/variants'
import { getNumPortions } from 'selectors/basket'
import { getRecipeTitle } from 'selectors/recipe'
import { getRecipes } from 'selectors/root'

import { getChangeCheckedRecipeHandler } from './getChangeCheckedRecipeHandler'
import { Recipe, RecipeImmutable, CollectionImmutable } from './types'

const compareCoreRecipeIds = (a: Recipe, b: Recipe) =>
  parseInt(a.coreRecipeId, 10) - parseInt(b.coreRecipeId, 10)

// eslint-disable-next-line no-unused-vars
type GetAlternativeOptionsForRecipe<T extends Recipe = Recipe> = (args: {
  /**
   * ID of the original recipe
   */
  originalId: string
  /**
   * ID of recipe (alternative option) that is already selected
   */
  recipeId: string
  isOnDetailScreen: boolean

  categoryId?: string
  closeOnSelection?: boolean
}) => {
  // This is what would be fed into Alternative Option menu item
  recipeId: T['id']
  recipeName: string
  // eslint-disable-next-line no-unused-vars
  changeCheckedRecipe: (checkedRecipeId: Recipe['id'], isOutOfStock: boolean) => void
  isChecked: boolean
  isOnDetailScreen: boolean
  isOutOfStock: boolean
  surcharge?: number | null
}[]

// eslint-disable-next-line no-unused-vars
type UseAlternativeOptions = (args?: { allCollections?: AllCollections }) => {
  getAlternativeOptionsForRecipe: GetAlternativeOptionsForRecipe
}
type AllCollections = Immutable.Map<string, CollectionImmutable>

export const useAlternativeOptions: UseAlternativeOptions = ({ allCollections } = {}) => {
  const collectionIdFromDetails = useSelector<RootStateOrAny, string | undefined>(
    getMenuCategoryIdForDetails,
  )
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
  const dispatch = useDispatch()
  const recipeReference = useRecipeReference()

  const getAlternativeOptionsForRecipe: GetAlternativeOptionsForRecipe = ({
    recipeId,
    originalId,
    categoryId,
    isOnDetailScreen,
    closeOnSelection,
  }) => {
    const collectionId = categoryId || collectionIdFromDetails

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

      const changeCheckedRecipe = getChangeCheckedRecipeHandler({
        dispatch,
        isOnDetailScreen,
        originalId,
        collectionId,
        closeOnSelection,
        recipeReference,
      })

      return {
        recipeId: coreRecipeId,
        recipeName: displayName,
        changeCheckedRecipe,
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
