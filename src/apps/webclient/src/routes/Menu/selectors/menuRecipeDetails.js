export const getMenuRecipeIdForDetails = ({ menuRecipeDetails }) =>
  menuRecipeDetails.get('recipeId', null)
export const getMenuCategoryIdForDetails = ({ menuRecipeDetails }) =>
  menuRecipeDetails.get('categoryId', null)
export const getMenuRecipeReferenceForDetails = ({ menuRecipeDetails }) =>
  menuRecipeDetails.get('recipeReference', null)
