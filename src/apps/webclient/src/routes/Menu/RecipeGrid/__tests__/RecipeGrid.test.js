import React from 'react'
import { shallow } from 'enzyme'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { RecipeListWrapper } from 'routes/Menu/RecipeList'
import { DetailOverlay } from 'routes/Menu/DetailOverlay'

describe('RecipeGrid', () => {
  const wrapper = shallow(
    <RecipeGrid
      menuCurrentCollectionId=""
      menuRecipeDetailShow=""
      isClient
    />
  )

  test('should not show a collections nav', () => {
    expect(wrapper.find('CollectionsNav')).toHaveLength(0)
  })
  test('should render a RecipeListWrapper component', () => {
    expect(wrapper.find(RecipeListWrapper)).toHaveLength(1)
  })
  test('should render a DetailOverlay component', () => {
    expect(wrapper.find(DetailOverlay)).toHaveLength(1)
  })
})
