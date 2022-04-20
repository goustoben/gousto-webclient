import { Map } from 'immutable'

type Recipe = Map<string, string>

type ReplacerResult = {
  recipe: Recipe
  originalId: string
  reference: string
}

type ReplacementMap = {
  [k: string]: string
}

// eslint-disable-next-line no-unused-vars
type GetSelectedVariantsReplacer = (args: {
  recipes: Recipe[]
  replacementMap: ReplacementMap
}) => ({ recipe, reference }: { recipe: Recipe; reference: string }) => ReplacerResult

export const getSelectedVariantsReplacer: GetSelectedVariantsReplacer =
  ({ recipes, replacementMap }) =>
  ({
    recipe,
    reference: recipeReference,
  }: {
    recipe: Recipe
    reference: string
  }): ReplacerResult => {
    let newRecipe = recipe

    if (replacementMap[recipeReference]) {
      const replacementRecipe = recipes.find(
        (r1) => r1.get('id') === replacementMap[recipeReference]
      )

      if (replacementRecipe) {
        newRecipe = replacementRecipe
      }
    }

    return { recipe: newRecipe, originalId: recipe.get('id'), reference: recipeReference }
  }
