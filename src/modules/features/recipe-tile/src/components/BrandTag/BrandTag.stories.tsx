import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RecipeContextProvider } from '../../model/context'
import { BrandTag } from './BrandTag'
type GetMocksArgs = Partial<{
  text: string;
  color: string;
}>

const getMocks = ({text = 'New', color = '#01A92B'}: GetMocksArgs) => {
  const tag = {
    text,
    slug: 'new-eme',
    type: 'general',
    themes: [{
      color,
      name: 'light',
      borderColor: color,
    }]
  }

  const recipe = {
    id: '12345',
    title: 'A Recipe Title',
    media: { },
    tagline: tag.slug,
  }

  return {recipe}
}

export default {
  title: 'Menu/RecipeTile/BrandTag',
  component: BrandTag,
  decorators: [
    (Story, {args}) => {
      const { recipe } = getMocks({text: args.text, color: args.color})

      return (
        <RecipeContextProvider value={recipe}>
          <Story />
        </RecipeContextProvider>
      )
    }
  ],
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
      ],
    },
  },
} as ComponentMeta<typeof BrandTag>

type TemplateArgs = {
  text: string;
  color: string;
}

const Template: ComponentStory<typeof BrandTag> = (arg: TemplateArgs) => (<BrandTag {...arg} />)

export const SimpleBrandTag = Template.bind({})
SimpleBrandTag.args = {
  text: 'New',
  color: '#01A92B'
}

export const LongBrandTag = Template.bind({})
LongBrandTag.args = {
  text: 'EVERYDAY FAVOURITES',
  color: '#023fa8'
}
