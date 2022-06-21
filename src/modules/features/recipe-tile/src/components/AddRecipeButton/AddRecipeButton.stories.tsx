import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AddRecipeButton } from "./AddRecipeButton";
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

type StoryArgs = {
  isRecipeInBasket: boolean;
};

type AddRecipeButtonStory = (
  args: StoryArgs
) => ReturnType<typeof AddRecipeButton>;

const Template: ComponentStory<AddRecipeButtonStory> = (_: StoryArgs) => (
  <AddRecipeButton recipeId="recipe_123" />
);

export const Simple = Template.bind({});
Simple.args = {
  isRecipeInBasket: false,
};

export default {
  title: "Menu/RecipeTile/AddRecipeButton",
  component: Template,
  decorators: [
    (Story, { args }) => {
      const mocks = getMocks({
        isRecipeInBasket: args.isRecipeInBasket,
      });

      return (
        <RecipeTileDependencies {...mocks}>
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
} as ComponentMeta<AddRecipeButtonStory>;
