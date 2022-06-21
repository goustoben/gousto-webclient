import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";
import { BrandTag } from './BrandTag';

type StoryArgs = {
  text: string
  color: string
};

type BrandTagStory = (
  args: StoryArgs
) => ReturnType<typeof BrandTag>;

const Template: ComponentStory<BrandTagStory> = (_: StoryArgs) => (
  <BrandTag />
);

export const Desktop = Template.bind({});

export default {
  title: "Menu/RecipeTile/BrandTag",
  component: Template,
  decorators: [
    (Story, { args }) => {
      const mocks = getMocks({
        brandTagText: args.text,
        brandTagColor: args.color,
      });

      return (
        <RecipeTileDependencies {...mocks}>
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
  argTypes: {
    text: {
      name: "Recipe Cooking Time",
      control: {
        type: "text",
      },
      defaultValue: "New",
    },
    color: {
      name: "Text color",
      control: {
        type: 'color'
      },
      defaultValue: '#023fa8',
    },
  },
} as ComponentMeta<BrandTagStory>;
