import { UseTracking } from '../../model/context/useTracking'
import { Recipe } from '../../model/recipe';

export const getMocks = ({
  alternativeCheckedIndex,
  alternativeOutOfStockFlags = [],
  alternativeSurcharges = [],
  alternativeTitles = [],
  cookingTime = 5,
  isRecipeInBasket = false,
  numberOfAlternatives = 2,
  title = "A Recipe Title",
  surcharge = 0,
  isRecipeOutOfStock = false,
  isFineDineIn = false,
}: {
  alternativeCheckedIndex?: number;
  alternativeOutOfStockFlags?: boolean[];
  alternativeSurcharges?: number[];
  alternativeTitles?: string[];
  cookingTime?: number;
  isRecipeInBasket?: boolean;
  numberOfAlternatives?: number;
  title?: string;
  surcharge?: number
  isRecipeOutOfStock?: boolean,
  isFineDineIn?: boolean,
}) => {
  const recipe: Recipe = {
    id: "12345",
    title,
    cookingTime,
    isFineDineIn,
  };

  const useStock = () => ({
    isRecipeOutOfStock: () => isRecipeOutOfStock,
  });

  const useGetAlternativeOptionsForRecipe = () => () =>
    Array.from(Array(numberOfAlternatives).keys()).map((index) => ({
      recipeId: `recipe_${index}`,
      recipeName: alternativeTitles[index] || "nice recipe",
      changeCheckedRecipe: () => false,
      isChecked: alternativeCheckedIndex === index ? true : false,
      isOnDetailScreen: false,
      isOutOfStock: Boolean(alternativeOutOfStockFlags[index]),
      ...( alternativeSurcharges[index] && {surcharge: alternativeSurcharges[index]} ),
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

  const useTracking: UseTracking = () => ({
    useTrackVariantListDisplay: () => false,
    useTrackingSwapAlternativeOptions: () => ({
      trackRecipeAlternativeOptionsMenuOpen: () => false,
      trackRecipeAlternativeOptionsMenuSwapRecipes: () => false,
    })
  })

  const useGetSurchargeForRecipeId = () => surcharge

  return {
    recipe,
    useStock,
    useGetAlternativeOptionsForRecipe,
    useBasket,
    useSetBrowserCTAVisibility,
    useTracking,
    useGetSurchargeForRecipeId,
  };
};
