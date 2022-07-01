import Immutable from 'immutable'
import { TransformedRecipe } from '../../transformer'

/**
 * Prefix that identifies the Recipe Reference based on "family" fingerprint.
 *
 * Must always be `TRUTHY`.
 */
export const recipeReferencePrefix = 'recipe_family_reference_'

type RecipeCounter = Record<string, number>

/**
 * High order function to build a mapper that takes a Immutable `recipe` object
 * and returns an "envelop" with properties:
 *
 *    `recipe` - an Immutable recipe object
 *
 *    `reference` - an identifier to refer to the recipe within context of the list the recipe belongs to
 * (e.g. list of recipes in particular category).
 *
 * @param `recipesVariants` - an Immutable object that holds information about all variants indexed by recipeIds
 *
 * Important: The resulting "injector" function is "stateful" and should be used only within single logical
 * list of recipes. For instance for recipes in single collection.
 */
export const getRecipeReferenceInjector = ({
  recipesVariants,
}: {
  recipesVariants: Immutable.Map<string, Immutable.Map<string, any>>
}) => {
  // Statistics of occurrences for a given recipe "family" within currently
  // traversed list of recipes. E.g.: `{ 12345: 2 }` indicates the recipe 12345 occurred 2 times.
  const recipeCounter: RecipeCounter = {}

  // Function to map given recipeId to the hash that identifies the recipe's "family"
  // and place of that family within context of current list of recipes and relatively
  // to other recipes from the same "family"
  const getRecipeFingerprint = (recipeId: string) => {
    const variantList = recipesVariants?.get(recipeId)
    const alternatives: { coreRecipeId: string }[] = variantList?.get('alternatives')?.toJS() || []

    return [recipeId, ...alternatives.map(({ coreRecipeId }) => coreRecipeId)].sort().join(',')
  }

  return function injector(recipe: TransformedRecipe) {
    const hash = getRecipeFingerprint(recipe.id)
    const counter = (recipeCounter[hash] || 0) + 1
    // eslint-disable-next-line no-param-reassign
    recipeCounter[hash] = counter

    return { recipe, reference: `${recipeReferencePrefix}${hash}__${counter}` }
  }
}
