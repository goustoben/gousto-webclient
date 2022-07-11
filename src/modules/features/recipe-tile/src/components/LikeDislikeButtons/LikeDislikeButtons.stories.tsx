import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LikeDislikeButtons } from './LikeDislikeButtons'
import { RecipeTileDependencies } from "../../model/context";
import { getMocks } from "../../utils/storybook/mocks";

type LikeDislikeButtonsStory = () => ReturnType<typeof LikeDislikeButtons>;

const Template: ComponentStory<LikeDislikeButtonsStory> = () => (
  <LikeDislikeButtons />
);

export const Simple = Template.bind({});

export default {
  title: "Menu/RecipeTile/LikeDislikeButtons",
  component: Template,
  argTypes: {
    onTrack: {
      action: 'tracked',
    }
  },
  decorators: [
    (Story, { args }) => {
      const mocks = getMocks({ onTrack: (args as any).onTrack });

      return (
        <RecipeTileDependencies {...mocks}>
          <Story /> 
        </RecipeTileDependencies>
      );
    },
  ],
} as ComponentMeta<LikeDislikeButtonsStory>;
