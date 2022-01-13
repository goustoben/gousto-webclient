/* eslint-disable import/no-default-export */
import React from 'react'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RecipeContextProvider } from 'routes/Menu/context/recipeContext'
import { RecipeTile } from './RecipeTile'

type GetMocksArgs = Partial<{
  surcharge: number;
  withVariants: boolean;
  recipeTitle: string;
  availabilityTag: string;
  availabilityTagColor: string;
  brandTag: string;
  brandTagColor: string;
}>

const RECIPE_ID_1 = 'aaa'
const RECIPE_ID_2 = 'bbb'
const RECIPE_ID_3 = 'ccc'
const COLLECTION_ID = 'collection 1'

const getMocks = ({
  surcharge = 0,
  withVariants = false,
  recipeTitle = 'Herb-Crusted Salmon With Hasselback Potatoes',
  availabilityTag,
  availabilityTagColor = '#01A92B',
  brandTag,
  brandTagColor = '#11A92B',
}: GetMocksArgs) => {
  const menuId = 'menu 1'

  const tag = {
    text: brandTag,
    slug: 'new-eme-vpp',
    type: 'general',
    themes: [{
      color: brandTagColor,
      name: 'light',
      borderColor: brandTagColor,
    }]
  }

  const RECIPE_1 = Immutable.fromJS({
    id: RECIPE_ID_1,
    coreRecipeId: RECIPE_ID_1,
    title: recipeTitle,

    media: {
      images: [
        { urls: [
          {
            src: 'https://production-media.gousto.co.uk/cms/mood-image/1432-Warming-Chicken-Bhuna-Rice--Naan-x400.jpg',
            width: 400,
          },
        ] },
      ],
    },
    cookingTime: 35,

    tagline: tag.slug,
    isNew: true,

    meals: Immutable.fromJS([{
      numPortions: 2,
      surcharge: {
        listPrice: surcharge,
      }
    },
    {
      numPortions: 4,
      surcharge: {
        listPrice: '1.99'
      }
    }])
  })

  const RECIPE_2 = Immutable.Map({
    id: RECIPE_ID_2,
    coreRecipeId: RECIPE_ID_2,
    title: 'Title TWO',
  })

  const RECIPE_3 = Immutable.Map({
    id: RECIPE_ID_3,
    coreRecipeId: RECIPE_ID_3,
    title: 'Title THREE',
  })

  const COLLECTION_A = Immutable.Map({
    id: COLLECTION_ID,
    published: true,
    shortTitle: 'One Category',
    recipesInCollection: Immutable.List([RECIPE_1, RECIPE_2, RECIPE_3].map(r => r.get('id'))),
    requirements: Immutable.fromJS({})
  })

  const state = {
    auth: Immutable.fromJS({}),
    routing: {
      locationBeforeTransitions: { query: {} },
    },

    recipes: Immutable.fromJS({
      [RECIPE_ID_1]: RECIPE_1,
      [RECIPE_ID_2]: RECIPE_2,
      [RECIPE_ID_3]: RECIPE_3,
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
      currentMenuId: menuId,
    }),
    menuRecipeStock: Immutable.fromJS({
      [RECIPE_ID_1]: { 2: 1000, 4: 1000 },
      [RECIPE_ID_2]: { 2: 1000, 4: 1000 },
      [RECIPE_ID_3]: { 2: 1000, 4: 1000 },
    }),
    menuRecipes: Immutable.fromJS([RECIPE_1.get('id'), RECIPE_2.get('id'), RECIPE_3.get('id')]),
    menuCollections: Immutable.fromJS({
      [COLLECTION_A.get('id')]: COLLECTION_A,
    }),
    menuRecipeDetails: Immutable.Map({
      recipeId: '1234',
    }),
    menu: Immutable.fromJS({
      recipeId: RECIPE_ID_1,
      originalId: RECIPE_ID_1,
      categoryId: COLLECTION_ID,
      menuVariants: Immutable.fromJS(
        withVariants
          ? {
            [menuId]: {
              [RECIPE_ID_1]: {
                alternatives: [
                  {
                    id: 'UUID_1',
                    coreRecipeId: RECIPE_ID_2,
                    displayName: RECIPE_2.get('title'),
                  },
                  {
                    id: 'UUID_3',
                    coreRecipeId: RECIPE_ID_3,
                    displayName: RECIPE_3.get('title'),
                  },
                ],
              },
            },
          }
          : {}
      ),
    }),
    brand: {
      data: {
        tags: [
          // Custom tag
          brandTag ? tag : {},
          // New tag
          availabilityTag
            ? {
              slug: 'new-eme',
              text: availabilityTag,
              type: 'general',
              themes: [
                {
                  name: 'light',
                  backgroundColor: availabilityTagColor,
                  color: '#FFFFFF',
                },
              ],
            }
            : {},
        ],
      },
    },
  }

  const mockStore = configureMockStore()
  const store = mockStore(state)

  return {recipe: RECIPE_1, store}
}

const wrapStoryWithRequiredContexts = (Story: any, {args}: any) => {
  const { recipe, store } = getMocks(args)

  return (
    <Provider store={store}>
      <RecipeContextProvider value={recipe}>
        <Story />
      </RecipeContextProvider>
    </Provider>
  )
}

/**
 * Section of `argTypes` that makes affected props hidden from the Control tab
 * when rendered in the Storybook
 */
const argsTypeHideFromControlTab = {
  control: {
    disable: true,
  },
  table: {
    disable: true,
  },
}

export default {
  title: 'Menu/RecipeTile/RecipeTile',
  component: RecipeTile,
  decorators: [ wrapStoryWithRequiredContexts ],
  argTypes: {
    recipeTitle: {
      name: 'Recipe Title',
      type: 'string',
    },
    surcharge: {
      name: 'Surcharge',
      type: 'number',
      description: 'Surcharge which applies to the recipe, respecting number of portions',
    },
    withVariants: {
      name: 'Has alternatives',
      type: 'boolean',
      description: 'Does the recipe have alternative options'
    },
    availabilityTag: {
      name: 'Availability Tag text',
      type: 'string',
      description: 'Text for the Availability Tag',
    },
    availabilityTagColor: {
      name: 'Color of Availability Tag',
      type: 'string',
      description: 'Background color for the Availability tag. Used only when `availabilityTag` is set.',
    },
    brandTag: {
      name: 'Brand Tag text',
      type: 'string',
      description: 'Text for the Brand Tag',
    },
    brandTagColor: {
      name: 'Brand Tag background color',
      type: 'string',
      description: 'Background color for the Brand tag. Used only when `brandTag` is set.',
    },
    recipeId: { ...argsTypeHideFromControlTab },
    originalId: { ...argsTypeHideFromControlTab },
    categoryId: { ...argsTypeHideFromControlTab },
    fdiStyling: { ...argsTypeHideFromControlTab },
  },
  parameters: {
    // Shows more details on the Control tab
    controls: { expanded: true },
  },
} as ComponentMeta<React.FC<TemplateArgs>>

type TemplateArgs = {
  surcharge: number;
  withVariants: boolean;
  recipeTitle: string;
  availabilityTag: string;
  availabilityTagColor: string;
  brandTag: string;
  brandTagColor: string;
}

const Template: ComponentStory<React.FC<TemplateArgs>> = (_) => (
  <RecipeTile
    recipeId={RECIPE_ID_1}
    originalId={RECIPE_ID_1}
    categoryId={COLLECTION_ID}
  />
)

export const Complex = Template.bind({})

Complex.args = {
  surcharge: 1,
  withVariants: true,
  recipeTitle: 'Herb-Crusted Salmon With Hasselback Potatoes',
  availabilityTag: 'New',
  availabilityTagColor: '#01A92B',
  brandTag: 'Healthy option',
  brandTagColor: '#01A92B',
}

export const Simple = Template.bind({})

Simple.args = {
  surcharge: 0,
  withVariants: false,
  recipeTitle: 'Simple dish',
}

export const WithAvailabilityTag = Template.bind({})

WithAvailabilityTag.args = {
  surcharge: 0,
  withVariants: false,
  recipeTitle: 'Dish with availability tag',
  availabilityTag: 'Cool tag',
}

export const WithBrandTag = Template.bind({})

WithBrandTag.args = {
  surcharge: 0,
  withVariants: false,
  recipeTitle: 'Dish with brand tag',
  brandTag: 'New brand',
}

export const WithAlternatives = Template.bind({})

WithAlternatives.args = {
  surcharge: 0,
  withVariants: true,
  recipeTitle: 'Recipe that has alternative options',
}
