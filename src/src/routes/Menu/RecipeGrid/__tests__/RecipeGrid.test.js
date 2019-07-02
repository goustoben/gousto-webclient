import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import RecipeList from 'routes/Menu/RecipeList'
import DetailOverlay from 'routes/Menu/DetailOverlay'

describe('RecipeGrid', () => {
  const wrapper = shallow(
    <RecipeGrid
      mobileGridView
      showDetailRecipe={jest.fn()}
      menuCurrentCollectionId={''}
      menuRecipeDetailShow={''}
      features={Immutable.fromJS({
        filterMenu: {
          value: true,
        },
      })}
      isClient
    />
  )

  test('should not show a collections nav', () => {
    expect(wrapper.find('CollectionsNav').length).toBe(0)
  })
  test('should render a RecipeList component', () => {
    expect(wrapper.find(RecipeList)).toHaveLength(1)
  })
  test('should render a DetailOverlay component', () => {
    expect(wrapper.find(DetailOverlay)).toHaveLength(1)
  })
  test('should render a div with class name MasonaryContainer if filterMenu is true', () => {
    expect(wrapper.find(".masonryContainer")).toHaveLength(1)
  })
})

