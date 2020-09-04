import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { VariantRecipeListItem } from '../VariantRecipeListItem'
import { VariantRecipeListItemContainer } from '../VariantRecipeListItemContainer'

describe('<VariantRecipeListItemContainer />', () => {
  const recipeId = '123'

  const recipe = Immutable.fromJS({
    id: recipeId,
    dietaryClaims: Immutable.fromJS[
      {
        name: 'Gluten-free',
        slug: 'gluten-free'
      }
    ],
    meals: Immutable.fromJS([{
      numPortions: 2,
      surcharge: {
        listPrice: '0.99'
      }
    },
    {
      numPortions: 4,
      surcharge: {
        listPrice: '1.99'
      }
    }])
  })

  const state = {
    recipes: Immutable.fromJS({
      [recipeId]: recipe
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
    }),
    menuRecipeStock: Immutable.fromJS({
      [recipeId]: { 2: 1000, 4: 1000 }
    })
  }

  const wrapperOptions = {
    context: {
      store: {
        getState: () => state,
        dispatch: () => {},
        subscribe: () => {},
      }
    }
  }

  const wrapper = shallow(
    <VariantRecipeListItemContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    const thing = wrapper.find(VariantRecipeListItem)
    expect(thing.prop('surcharge')).toEqual(0.50)
    expect(thing.prop('isOutOfStock')).toEqual(false)
    expect(thing.prop('allergenInfo')).toEqual({containsGlutenOrDairy: true})
    expect(thing.prop('numPortions')).toEqual(2)
  })
})
