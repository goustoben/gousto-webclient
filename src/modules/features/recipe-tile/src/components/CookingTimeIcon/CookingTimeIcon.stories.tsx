import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CookingTimeIcon } from './CookingTimeIcon'
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

const defaultCookingTime = 20;

type StoryArgs = {
  cookingTime: number;
};

type CookingTimeIconStory = (args: StoryArgs) => ReturnType<typeof CookingTimeIcon>;

const Template: ComponentStory<CookingTimeIconStory> = (_: StoryArgs) => (
  <CookingTimeIcon />
);

export const Simple = Template.bind({});
Simple.args = {
  cookingTime: defaultCookingTime,
};

export default {
  title: "Menu/RecipeTile/CookingTimeIcon",
  component: Template,
  decorators: [
    (Story, { args }) => {
      const {
        recipe,
        useStock,
        useGetAlternativeOptionsForRecipe,
        useBasket,
        useSetBrowserCTAVisibility,
      } = getMocks({
        cookingTime: args.cookingTime,
      });

      return (
        <RecipeTileDependencies
          recipe={recipe}
          useGetAlternativeOptionsForRecipe={useGetAlternativeOptionsForRecipe}
          useStock={useStock}
          useBasket={useBasket}
          useSetBrowserCTAVisibility={useSetBrowserCTAVisibility}
        >
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
} as ComponentMeta<CookingTimeIconStory>;
