
export const getMocks = ({
  isRecipeInBasket = false,
  numberOfAlternatives = 2,
}: {
  isRecipeInBasket?: boolean;
  numberOfAlternatives?: number;
}) => {
  const recipe = {
    id: "12345",
    title: "A Recipe Title",
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
