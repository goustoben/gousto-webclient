import { UseMakeOnCheckRecipe } from '../../model/context/useMakeOnCheckRecipe';
import { UseRecipeBrand } from '../../model/context/useRecipeBrand';
import { UseTracking } from '../../model/context/useTracking'
import { Recipe } from '../../model/recipe';

const defaultRecipeImage300 = "https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/3310---Battered-Fish-Salt--Vinegar-Chips--Mushy-Peas0494-1617814005204-x300.jpg"

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
  recipeImage300 = defaultRecipeImage300,
  recipeTagText,
  recipeTagColor,
  recipeTagBackgroundColor,
  brandTagText,
  brandTagColor,
  isRecipeTileLinkVisible = false,
  onTrack = () => { },
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
  recipeImage300?: string,
  recipeTagText?: string,
  recipeTagBackgroundColor?: string,
  recipeTagColor?: string,
  brandTagText?: string
  brandTagColor?: string
  isRecipeTileLinkVisible?: boolean
  onTrack?: () => void
} = {}) => {
  const recipe: Recipe = {
    id: "12345",
    title,
    cookingTime,
    isFineDineIn,
    media: {
      images: [{
        type: "homepage-image",
        title: "home page image",
        description: "Cool image",
        urls: [
          {
            src: "https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/3310---Battered-Fish-Salt--Vinegar-Chips--Mushy-Peas0494-1617814005204-x200.jpg",
            width: 200,
          },
          {
            src: "https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/3310---Battered-Fish-Salt--Vinegar-Chips--Mushy-Peas0494-1617814005204-x50.jpg",
            width: 50,
          },
          {
            src: recipeImage300,
            width: 300,
          },
        ],
      }]
    },
    tagline: 'new-eme',
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
      ...(alternativeSurcharges[index] && { surcharge: alternativeSurcharges[index] }),
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
    }),
    track: onTrack,
  })

  const useGetSurchargeForRecipeId = () => surcharge

  const useRecipeBrand: UseRecipeBrand = () => ({
    useRecipeBrandAvailabilityTag: () => (recipeTagText ? {
      slug: 'slug',
      text: recipeTagText,
      theme: {
        name: 'boom',
        color: recipeTagColor || 'white',
        backgroundColor: recipeTagBackgroundColor || 'rgb(1, 169, 43)',
      }
    } : null),
    useRecipeBrandTag: () => (brandTagText ? {
      slug: 'slug',
      text: brandTagText,
      theme: {
        name: 'boom',
        color: brandTagColor || 'red',
      }
    } : null)
  })

  const useGetRecipeTileLinkData = () => ({
    isRecipeTileLinkVisible,
    dispatchTrackClickMoreRecipeDetails: () => { }
  })

  const useMakeOnCheckRecipe: UseMakeOnCheckRecipe = (() => () => () => () => { }) as UseMakeOnCheckRecipe

  return {
    recipe,
    useStock,
    useGetAlternativeOptionsForRecipe,
    useBasket,
    useSetBrowserCTAVisibility,
    useTracking,
    useGetSurchargeForRecipeId,
    useRecipeBrand,
    useGetRecipeTileLinkData,
    useMakeOnCheckRecipe,
  };
};
