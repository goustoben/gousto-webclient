import React from 'react'
import { shallow } from 'enzyme'
import { RecipeGrid } from '../RecipeGrid'
import { RecipeListWrapper } from '../../RecipeList'
import { DetailOverlay } from '../../../components/Detail/DetailOverlay'

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
