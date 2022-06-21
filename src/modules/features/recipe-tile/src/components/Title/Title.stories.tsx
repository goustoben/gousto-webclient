import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

import { Title } from "./Title";

type StoryArgs = {
  title: string;
};

type TitleStory = (args: StoryArgs) => ReturnType<typeof Title>;

const Template: ComponentStory<TitleStory> = (_: StoryArgs) => (
  <Title />
);

export const Simple = Template.bind({});
Simple.args = {
  title: "Lemony Chicken Milanese With Spaghetti and Tomato Sauce",
};

export default {
  title: "Menu/RecipeTile/Title",
  component: Template,
  decorators: [
    (Story, { args }) => {
      const mocks = getMocks({
        title: args.title,
      });

      return (
        <RecipeTileDependencies {...mocks}>
          <Story />
        </RecipeTileDependencies>
      );
    },
  ],
} as ComponentMeta<TitleStory>;
