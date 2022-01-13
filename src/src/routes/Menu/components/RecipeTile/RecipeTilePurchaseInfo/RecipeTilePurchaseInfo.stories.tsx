/* eslint-disable import/no-default-export */
import React from 'react'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RecipeContextProvider } from 'routes/Menu/context/recipeContext'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'

type GetMocksArgs = Partial<{
  // color: string;
  surcharge: number;
}>

const RECIPE_ID_1 = 'aaa'
const RECIPE_ID_2 = 'bbb'
const RECIPE_ID_3 = 'ccc'
const COLLECTION_ID = 'collection 1'

const getMocks = ({surcharge = 0}: GetMocksArgs) => {
  const menuId = 'menu 1'

  const RECIPE_1 = Immutable.fromJS({
    id: RECIPE_ID_1,
    coreRecipeId: RECIPE_ID_1,
    title: 'Title ONE',
    dietaryClaims: Immutable.fromJS([
      {
        name: 'Gluten-free',
        slug: 'gluten-free'
      }
    ]),
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
    requirements: Immutable.fromJS({
      dietary_claims: [],
    })
  })

  const state = {
    auth: Immutable.fromJS({}),
    routing: {
      locationBeforeTransitions: {query: {}}
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
    menuRecipes: Immutable.fromJS([
      RECIPE_1.get('id'),
      RECIPE_2.get('id'),
      RECIPE_3.get('id'),
    ]),
    menuCollections: Immutable.fromJS({
      [COLLECTION_A.get('id')]: COLLECTION_A,
    }),
    menuRecipeDetails: Immutable.Map({
      recipeId: '1234'
    }),
    menu: Immutable.fromJS({
      recipeId: RECIPE_ID_1,
      originalId: RECIPE_ID_1,
      categoryId: COLLECTION_ID,
      menuVariants: Immutable.fromJS({
        [menuId]: {
          [RECIPE_ID_1]: {
            alternatives: [{
              id: 'UUID_1',
              coreRecipeId: RECIPE_ID_2,
              displayName: RECIPE_2.get('title'),
            }, {
              id: 'UUID_3',
              coreRecipeId: RECIPE_ID_1,
              displayName: RECIPE_3.get('title'),
            }]
          },
          [RECIPE_ID_2]: {
            alternatives: [{
              id: 'UUID_2',
              coreRecipeId: RECIPE_ID_1,
            }]
          },
        }
      }),
    }),
  }

  const mockStore = configureMockStore()
  const store = mockStore(state)

  return {recipe: RECIPE_1, store}
}

export default {
  title: 'Menu/RecipeTile/RecipeTilePurchaseInfo',
  component: RecipeTilePurchaseInfo,
  decorators: [
    (Story, {args}) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { recipe, store } = getMocks({surcharge: args.surcharge})

      return (
        <div id="app">
          <Provider store={store}>
            <RecipeContextProvider value={recipe}>
              <Story />
            </RecipeContextProvider>
          </Provider>
        </div>
      )
    }
  ]
} as ComponentMeta<typeof RecipeTilePurchaseInfo>

type TemplateArgs = {
  fdiStyling: boolean;
  surcharge: string;
}

// eslint-disable-next-line react/prop-types
const Template: ComponentStory<React.FC<TemplateArgs>> = (args) => {
  const {fdiStyling} = args

  return (
    <RecipeTilePurchaseInfo
      originalId={RECIPE_ID_1}
      categoryId={COLLECTION_ID}
      // fdiStyling={fdiStyling}
      fdiStyling
    />
  )
}

export const Simple = Template.bind({})
Simple.args = {
  fdiStyling: false,
  surcharge: '1',
}
