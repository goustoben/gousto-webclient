import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VariantHeader } from "./VariantHeader";
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

const defaultNumberOfAlternativesForThisStory = 2;

type StoryArgs = {
  numberOfAlternatives: number;
};

type VariantHeaderStory = (args: StoryArgs) => ReturnType<typeof VariantHeader>;

const Template: ComponentStory<VariantHeaderStory> = (_: StoryArgs) => (
  <VariantHeader categoryId="some_category_id" />
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
      const {
        recipe,
        useStock,
        useGetAlternativeOptionsForRecipe,
        useBasket,
        useSetBrowserCTAVisibility,
        useTracking,
        useGetSurchargeForRecipeId,
      } = getMocks({
        numberOfAlternatives: args.numberOfAlternatives,
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
} as ComponentMeta<VariantHeaderStory>;
