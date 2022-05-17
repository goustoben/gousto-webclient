import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VariantHeader } from "./VariantHeader";
import { RecipeTileDependencies } from "../../model/context";

const defaultNumberOfAlternativesForThisStory = 2;

const getMocks = ({
  numberOfAlternatives = defaultNumberOfAlternativesForThisStory,
}: {
  numberOfAlternatives: number;
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

  return {
    recipe,
    useStock,
    useGetAlternativeOptionsForRecipe,
  };
};

type StoryArgs = {
  numberOfAlternatives: number;
};

type VariantHeaderStory = (args: StoryArgs) => ReturnType<typeof VariantHeader>;

const Template: ComponentStory<VariantHeaderStory> = (_: StoryArgs) => (
  <VariantHeader categoryId="some_category_id" originalId="some_original_id" />
);

export const Simple = Template.bind({});
Simple.args = {
  numberOfAlternatives: defaultNumberOfAlternativesForThisStory,
};

export default {
  title: "Menu/RecipeTile/VariantHeader",
  component: Template,
  decorators: [
    (Story, { args }) => {
      const { recipe, useStock, useGetAlternativeOptionsForRecipe } = getMocks({
        numberOfAlternatives: args.numberOfAlternatives,
      });

      return (
        <RecipeTileDependencies
          recipe={recipe}
          useGetAlternativeOptionsForRecipe={useGetAlternativeOptionsForRecipe}
          useStock={useStock}
        >
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
} as ComponentMeta<VariantHeaderStory>;
