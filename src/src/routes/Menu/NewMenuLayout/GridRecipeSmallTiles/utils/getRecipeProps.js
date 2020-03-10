import { getFeaturedImage } from 'utils/image'
import { DESKTOP_VIEW } from 'utils/view'
import { formatRecipeTitle, getFoodBrand } from 'utils/recipe'

export const getRecipeProps = (recipe, numPortions) => ({
  id: recipe.get('id'),
  averageRating: recipe.getIn(['rating', 'average']),
  cookingTime: numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily'),
  ratingCount: recipe.getIn(['rating', 'count']),
  useWithin: recipe.get('shelfLifeDays'),
  fiveADay: recipe.get('fiveADay'),
  media: getFeaturedImage(recipe, '', DESKTOP_VIEW),
  title: formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', '')),
  diet: recipe.get('dietType'),
  range: getFoodBrand(recipe)
})
