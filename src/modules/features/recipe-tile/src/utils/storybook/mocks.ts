
export const getMocks = ({
  isRecipeInBasket = false,
  numberOfAlternatives = 2,
  title = "A Recipe Title",
  cookingTime = 5,
}: {
  isRecipeInBasket?: boolean;
  numberOfAlternatives?: number;
  title?: string;
  cookingTime?: number;
}) => {
  const recipe = {
    id: "12345",
    title,
    cookingTime,
  };

  const useStock = () => ({
    isRecipeOutOfStock: () => false,
  });

  const useGetAlternativeOptionsForRecipe = () => () =>
    Array.from(Array(numberOfAlternatives).keys()).map((index) => ({
      recipeId: `recipe_${index}`,
      recipeName: "nice recipe",
      changeCheckedRecipe: () => false,
      isChecked: false,
      isOnDetailScreen: false,
      isOutOfStock: false,
    }));

  const useBasket = () => ({
    canAddRecipes: true,
    addRecipe: () => false,
    removeRecipe: () => false,
    reachedLimit: false,
    isRecipeInBasket: () => isRecipeInBasket,
    numPortions: 2,
  })

  const useSetBrowserCTAVisibility = () => ({
    setBrowserCTAVisible: () => false,
  })

  return {
    recipe,
    useStock,
    useGetAlternativeOptionsForRecipe,
    useBasket,
    useSetBrowserCTAVisibility,
  };
};
