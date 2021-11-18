import {Map} from 'immutable'

type Recipe = Map<string, string>

type ReplacerResult = {
  recipe: Recipe;
  originalId: string;
}

type ReplacementMap = {
  [k:string]: string;
}

// eslint-disable-next-line no-unused-vars
type GetSelectedVariantsReplacer = (args: { recipes: Recipe[], replacementMap: ReplacementMap }) => (recipe: Recipe) => ReplacerResult;

export const getSelectedVariantsReplacer: GetSelectedVariantsReplacer = ({recipes, replacementMap}) => (recipe: Recipe): ReplacerResult => {
  let newRecipe = recipe

  if (replacementMap[recipe.get('id')]) {
    const replacementRecipe = recipes.find(r1 => r1.get('id') === replacementMap[recipe.get('id')])

    if (replacementRecipe) {
      newRecipe = replacementRecipe
    }
  }

  return {recipe: newRecipe, originalId: recipe.get('id')}
}
