/* eslint-disable import/no-default-export */
import React from 'react'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RecipeContextProvider } from 'routes/Menu/context/recipeContext'
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

  const recipe = Immutable.fromJS({
    id: '12345',
    title: 'A Recipe Title',
    media: { },
    tagline: tag.slug,
  })

  const mockStore = configureMockStore()
  const store = mockStore({
    brand: {
      data: {
        tags: [ tag ]
      }
    },
  })

  return {recipe, store}
}

export default {
  title: 'Menu/RecipeTile/BrandTag',
  component: BrandTag,
  decorators: [
    (Story, {args}) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { recipe, store } = getMocks({text: args.text, color: args.color})

      return (
        <Provider store={store}>
          <RecipeContextProvider value={recipe}>
            <Story />
          </RecipeContextProvider>
        </Provider>
      )
    }
  ]
} as ComponentMeta<typeof BrandTag>

type TemplateArgs = {
  text: string;
  color: string;
}

const Template: ComponentStory<React.FC<TemplateArgs>> = (args) => (<BrandTag />)

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
