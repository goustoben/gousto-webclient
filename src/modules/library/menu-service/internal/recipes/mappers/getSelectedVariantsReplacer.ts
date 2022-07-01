import { TransformedRecipe } from '../../transformer'

type ReplacerResult = {
  recipe: TransformedRecipe
  originalId: string
  reference: string
}

type ReplacementMap = {
  [k: string]: string
}

export function getSelectedVariantsReplacer({
  recipes,
  replacementMap,
}: {
  recipes: TransformedRecipe[]
  replacementMap: ReplacementMap
}) {
  return function (item: { recipe: TransformedRecipe; reference: string }): ReplacerResult {
    const { recipe, reference: recipeReference } = item
    let newRecipe = recipe

    if (replacementMap[recipeReference]) {
      const replacementRecipe = recipes.find((r1) => r1?.id === replacementMap[recipeReference])

      if (replacementRecipe) {
        newRecipe = replacementRecipe
      }
    }

    return { recipe: newRecipe, originalId: recipe.id, reference: recipeReference }
  }
}
