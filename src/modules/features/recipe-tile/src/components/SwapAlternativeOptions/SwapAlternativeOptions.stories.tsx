import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SwapAlternativeOptions } from "./SwapAlternativeOptions";
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from '../../utils/storybook/mocks'

type StoryArgs = {
  recipeTitles: {
    titles: string[]
  };
  recipeSurcharges: {
    surcharges: number[]
  };
  recipeOutOfStockFlags: {
    outOfStockFlags: boolean[]
  };
  checkedIndex: number;
};

type SwapAlternativeOptionsStory = (args: StoryArgs) => ReturnType<typeof SwapAlternativeOptions>;

const Template: ComponentStory<SwapAlternativeOptionsStory> = (_: StoryArgs) => (
  <SwapAlternativeOptions recipeId="some_recipe_id" categoryId="some_category_id" />
);

export const Desktop = Template.bind({});

export default {
  title: "Menu/RecipeTile/SwapAlternativeOptions",
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
      } = getMocks({
        numberOfAlternatives: args.recipeTitles?.titles?.length || 2,
        alternativeTitles: args.recipeTitles?.titles,
        ...(args.recipeTitles?.titles?.length !== undefined &&
          args.checkedIndex < args.recipeTitles?.titles?.length &&
          { alternativeCheckedIndex: args.checkedIndex }),
        alternativeSurcharges: args.recipeSurcharges?.surcharges,
        alternativeOutOfStockFlags: args.recipeOutOfStockFlags?.outOfStockFlags,
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
        >
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
  argTypes: {
    recipeTitles: {
      name: 'Alternative recipes titles',
      control: "object",
      defaultValue: {
        titles: [
          "Sticky Ginger Beef Mince With Sesame Noodles",
          "Sticky Ginger Lean Beef Mince With Sesame Noodles",
          "Sticky Ginger Meat-Free Mince With Sesame Noodles",
        ]
      },
    },
    recipeSurcharges: {
      name: 'Surcharges for alternative recipes',
      control: "object",
      defaultValue: {
        surcharges: [0, 2.5]
      },
    },
    recipeOutOfStockFlags: {
      name: 'Out of stock flags for alternative recipes',
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
      }
    }
  },
} as ComponentMeta<SwapAlternativeOptionsStory>;
