import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TileImage } from './TileImage';
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

type StoryArgs = {
  cookingTime: number
  imageUrl: string
  isRecipeOutOfStock: boolean
  hasVariants: boolean
};

type TileImageStory = (
  args: StoryArgs
) => ReturnType<typeof TileImage>;

const Template: ComponentStory<TileImageStory> = (_: StoryArgs) => (
  <TileImage
    categoryId="some_category_id"
    originalId="some_original_id"
  />
);

export const Desktop = Template.bind({});

export default {
  title: "Menu/RecipeTile/TileImage",
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
        numberOfAlternatives: args.hasVariants ? 3 : 0,
        isRecipeOutOfStock: args.isRecipeOutOfStock,
        cookingTime: args.cookingTime,
        recipeImage300: args.imageUrl,
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
      defaultValue: "https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/3310---Battered-Fish-Salt--Vinegar-Chips--Mushy-Peas0494-1617814005204-x300.jpg",
    },
    isRecipeOutOfStock: {
      name: "Is the recipe out of stock",
      control: "boolean",
      defaultValue: false,
    },
    hasVariants: {
      name: "If recipe has variants",
      control: "boolean",
      defaultValue: true,
    },
  },
} as ComponentMeta<TileImageStory>;
