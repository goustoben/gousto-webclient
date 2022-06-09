import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecipeTilePurchaseInfo } from ".";
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

type StoryArgs = {
  recipeTitles: {
    titles: string[];
  };
  recipeSurcharges: {
    surcharges: number[];
  };
  recipeOutOfStockFlags: {
    outOfStockFlags: boolean[];
  };
  checkedIndex: number;
  fineDiningEnabled: boolean;
};

type RecipeTilePurchaseInfoStory = (
  args: StoryArgs
) => ReturnType<typeof RecipeTilePurchaseInfo>;

const Template: ComponentStory<RecipeTilePurchaseInfoStory> = ({
  fineDiningEnabled,
}: StoryArgs) => (
  <RecipeTilePurchaseInfo
    categoryId="some_category_id"
    originalId="some_original_id"
    fdiStyling={fineDiningEnabled}
  />
);

export const Desktop = Template.bind({});

export default {
  title: "Menu/RecipeTile/RecipeTilePurchaseInfo",
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
      } = getMocks({
        numberOfAlternatives: args.recipeTitles?.titles?.length || 2,
        alternativeTitles: args.recipeTitles?.titles,
        ...(args.recipeTitles?.titles?.length !== undefined &&
          args.checkedIndex < args.recipeTitles?.titles?.length && {
            alternativeCheckedIndex: args.checkedIndex,
          }),
        alternativeSurcharges: args.recipeSurcharges?.surcharges,
        alternativeOutOfStockFlags: args.recipeOutOfStockFlags?.outOfStockFlags,
        surcharge: args.recipeSurcharges?.surcharges[args.checkedIndex],
        isRecipeOutOfStock:
          args.recipeOutOfStockFlags?.outOfStockFlags[args.checkedIndex],
        isFineDineIn: args.fineDiningEnabled,
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
        >
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
  argTypes: {
    recipeTitles: {
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
    recipeSurcharges: {
      name: "Surcharges for alternative recipes",
      control: "object",
      defaultValue: {
        surcharges: [0, 2.5],
      },
    },
    recipeOutOfStockFlags: {
      name: "Out of stock flags for alternative recipes",
      control: "object",
      defaultValue: {
        outOfStockFlags: [false, false, true],
      },
    },
    checkedIndex: {
      name: "Index of checked alternative",
      control: {
        type: "range",
        min: 0,
        max: 10,
        step: 1,
      },
      defaultValue: 0,
    },
    fineDiningEnabled: {
      name: "Fine Dine In",
      control: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<RecipeTilePurchaseInfoStory>;
