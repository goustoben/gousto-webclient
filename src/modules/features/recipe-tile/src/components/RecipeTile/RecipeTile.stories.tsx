import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecipeTile } from ".";
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

type StoryArgs = {
  cookingTime: number;
  imageUrl: string;
  isRecipeOutOfStock: boolean;
  recipeTag?: string;
  recipeTagColor?: string;
  recipeTagBackgroundColor?: string;
  brandTag?: string;
  brandTagColor?: string;
  isFineDineIn?: boolean;
  isRecipeInBasket?: boolean;
  recipeTitle: string;
  surcharge: number;
  hasAlternatives: boolean;
  variantsTitles: {
    titles: string[];
  };
  variantsSurcharges: {
    surcharges: number[];
  };
  variantsOutOfStockFlags: {
    outOfStockFlags: boolean[];
  };
  variantsCheckedIndex: number;
  isRecipeTileLinkVisible: boolean;
};

type RecipeTileStory = (args: StoryArgs) => ReturnType<typeof RecipeTile>;

const Template: ComponentStory<RecipeTileStory> = (_: StoryArgs) => (
  <RecipeTile
    originalId="recipe_one"
    currentCollectionId="current_collection_one"
    onClick={() => {}}
  />
);

export const Simple = Template.bind({});

export default {
  title: "Menu/RecipeTile/RecipeTile",
  component: Template,
  decorators: [
    (Story, { args }) => {
      const {
        recipe,
        useStock,
        useGetAlternativeOptionsForRecipe,
        useBasket,
        useSetBrowserCTAVisibility,
        useTracking,
        useGetSurchargeForRecipeId,
        useRecipeBrand,
        useGetRecipeTileLinkData,
      } = getMocks({
        isRecipeOutOfStock: args.isRecipeOutOfStock,
        cookingTime: args.cookingTime,
        recipeImage300: args.imageUrl,
        recipeTagText: args.recipeTag,
        recipeTagColor: args.recipeTagColor,
        recipeTagBackgroundColor: args.recipeTagBackgroundColor,
        isFineDineIn: args.isFineDineIn,
        isRecipeInBasket: args.isRecipeInBasket,

        title: args.hasAlternatives
          ? args.variantsTitles?.titles[args.variantsCheckedIndex]
          : args.recipeTitle,
        numberOfAlternatives: args.hasAlternatives
          ? args.variantsTitles?.titles?.length || 2
          : 0,
        alternativeTitles: args.variantsTitles?.titles,
        ...(args.variantsTitles?.titles?.length !== undefined &&
          args.variantsCheckedIndex < args.variantsTitles?.titles?.length && {
            alternativeCheckedIndex: args.variantsCheckedIndex,
          }),
        alternativeSurcharges: args.variantsSurcharges?.surcharges,
        alternativeOutOfStockFlags:
          args.variantsOutOfStockFlags?.outOfStockFlags,
        surcharge: args.hasAlternatives
          ? args.variantsSurcharges?.surcharges[args.variantsCheckedIndex]
          : args.surcharge,

        brandTagText: args.brandTag,
        brandTagColor: args.brandTagColor,
        isRecipeTileLinkVisible: args.isRecipeTileLinkVisible,
      });

      return (
        <RecipeTileDependencies
          recipe={recipe}
          useGetAlternativeOptionsForRecipe={useGetAlternativeOptionsForRecipe}
          useStock={useStock}
          useBasket={useBasket}
          useSetBrowserCTAVisibility={useSetBrowserCTAVisibility}
          useTracking={useTracking}
          useGetSurchargeForRecipeId={useGetSurchargeForRecipeId}
          useRecipeBrand={useRecipeBrand}
          useGetRecipeTileLinkData={useGetRecipeTileLinkData}
          useMakeOnCheckRecipe={() => () => () => {}}
        >
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
  argTypes: {
    recipeTag: {
      name: "Recipe Tag text",
      control: "text",
      defaultValue: "New",
    },
    recipeTagBackgroundColor: {
      name: "Recipe Tag background color",
      control: {
        type: "color",
      },
      defaultValue: "green",
    },
    recipeTagColor: {
      name: "Recipe Tag text color",
      control: {
        type: "color",
      },
      defaultValue: "white",
    },

    brandTag: {
      name: "Brand Tag text",
      control: "text",
      defaultValue: "10-minute",
    },
    brandTagColor: {
      name: "Brand Tag text color",
      control: {
        type: "color",
      },
      defaultValue: "rgb(26, 128, 135)",
    },

    isFineDineIn: {
      name: "Fine Dine In",
      control: "boolean",
      defaultValue: false,
    },

    cookingTime: {
      name: "Recipe Cooking Time",
      control: {
        type: "number",
        min: 0,
        max: 60,
        step: 1,
      },
      defaultValue: 15,
    },
    imageUrl: {
      name: "URL to big recipe image (300)",
      control: "text",
      defaultValue:
        "https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/3310---Battered-Fish-Salt--Vinegar-Chips--Mushy-Peas0494-1617814005204-x300.jpg",
    },
    isRecipeOutOfStock: {
      name: "Is the recipe out of stock",
      control: "boolean",
      defaultValue: false,
    },

    isRecipeInBasket: {
      name: "Is recipe in the basket?",
      control: "boolean",
      defaultValue: false,
    },

    recipeTitle: {
      name: "Recipe title (if no selected alternative)",
      control: "text",
      defaultValue: "Sticky Honey Mustard Posh Dogs With Chips",
    },

    surcharge: {
      name: "Recipe surcharge (if no selected alternative)",
      control: "number",
      defaultValue: 0,
    },

    hasAlternatives: {
      name: "Does recipe have alternatives",
      control: "boolean",
      defaultValue: false,
    },

    variantsTitles: {
      name: "Alternative recipes titles",
      control: "object",
      defaultValue: {
        titles: [
          "Sticky Ginger Beef Mince With Sesame Noodles",
          "Sticky Ginger Lean Beef Mince With Sesame Noodles",
          "Sticky Ginger Meat-Free Mince With Sesame Noodles",
        ],
      },
    },
    variantsSurcharges: {
      name: "Surcharges for alternative recipes",
      control: "object",
      defaultValue: {
        surcharges: [0, 2.5],
      },
    },
    variantsOutOfStockFlags: {
      name: "Out of stock flags for alternative recipes",
      control: "object",
      defaultValue: {
        outOfStockFlags: [false, false, true],
      },
    },
    variantsCheckedIndex: {
      name: "Index of checked alternative recipe",
      control: {
        type: "range",
        min: 0,
        max: 10,
        step: 1,
      },
      defaultValue: 0,
    },

    isRecipeTileLinkVisible: {
      name: "Is RecipeTile link is visible",
      control: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<RecipeTileStory>;
