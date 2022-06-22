import Immutable from 'immutable'

type ReplacerResult = {
  recipe: Immutable.Map<string, any>
  originalId: string
  reference: string
}

type ReplacementMap = {
  [k: string]: string
}

export function getSelectedVariantsReplacer({
  recipes,
  replacementMap
}: {
  recipes: Immutable.List<Immutable.Map<string, any>>
  replacementMap: ReplacementMap
}) {
  return function (item?: {
    recipe: Immutable.Map<string, any>
    reference: string
  }): ReplacerResult {
    if (!item) {
      // TODO remove this when we refactor out Immutable
      return item as any
    }

    const {
      recipe,
      reference: recipeReference,
    } = item
    let newRecipe = recipe

    if (replacementMap[recipeReference]) {
      const replacementRecipe = recipes.find(
        (r1) => r1?.get('id') === replacementMap[recipeReference],
      )

      if (replacementRecipe) {
        newRecipe = replacementRecipe
      }
    }

    return { recipe: newRecipe, originalId: recipe.get('id'), reference: recipeReference }
  }
}
