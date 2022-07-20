// this file and associated test file are part of a Turnips experiment
// personalised signup: re-order menu recipes according to cuisines selected by the user
import { TransformedRecipe } from '../../transformer';

const cuisineMappings: Record<string, string> = {
  italian: 'italian',
  tuscan: 'italian',
  indian: 'indian',
  goan: 'indian',
  gujarati: 'indian',
  punjabi: 'indian',
  asian: 'east asian',
  chinese: 'east asian',
  thai: 'east asian',
  japanese: 'east asian',
  vietnamese: 'east asian',
  korean: 'east asian',
  indonesian: 'east asian',
  filipino: 'east asian',
  'hong kong': 'east asian',
  taiwanese: 'east asian',
  mexican: 'mexican',
  american: 'american',
  british: 'british',
  mediterranean: 'mediterranean',
  spanish: 'mediterranean',
  portuguese: 'mediterranean',
  turkish: 'mediterranean',
  greek: 'mediterranean',
  cypriot: 'mediterranean',
  moroccan: 'mediterranean',
}

type Recipe = { 
  recipe: TransformedRecipe;
  originalId: string;
  reference: string;
}

const findMatch = (recipeCuisine: string, selectedCuisines: string[]) =>
  selectedCuisines.some((selectedCuisine) => selectedCuisine === cuisineMappings[recipeCuisine])

export function orderCollectionRecipesByCuisine(
  recipes: Recipe[],
  selectedCuisines: string[],
) {
  const topRecipes: Recipe[] = []
  const otherRecipes: Recipe[] = []

  recipes.forEach((args) => {
    const { recipe, originalId } = args
    const recipeCuisine = recipe.cuisine.toLowerCase()
    const match = findMatch(recipeCuisine, selectedCuisines)

    if (match && topRecipes.length < 25) {
      topRecipes.push({ ...args, recipe, originalId })
    } else {
      otherRecipes.push({ ...args, recipe, originalId })
    }
  })

  const trackingData = topRecipes.map((recipe) => recipe.originalId)

  return {
    orderedRecipes: [...topRecipes, ...otherRecipes],
    trackingData
  }
}
