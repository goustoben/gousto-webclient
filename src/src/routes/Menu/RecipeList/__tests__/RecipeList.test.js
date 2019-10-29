import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { trackRecipeOrderDisplayed } from 'actions/tracking'

import { RecipeList } from '../RecipeList'
import { MobileRecipeList } from '../MobileRecipeList'
import { DesktopRecipeList } from '../DesktopRecipeList'
import { TabletRecipeList } from '../TabletRecipeList/TabletRecipeList'

jest.mock('actions/tracking', () => ({
  trackRecipeOrderDisplayed: jest.fn()
    .mockReturnValue('trackRecipeOrderDisplayed return value'),
}))

describe('RecipeList', () => {
  const context = {
    store: {
      dispatch: jest.fn(),
    },
  }

  beforeEach(() => {
    context.store.dispatch.mockClear()
    trackRecipeOrderDisplayed.mockClear()
  })

  describe('when in mobile mode', () => {
    test('should render a MobileRecipeList', () => {
      const recipes = Immutable.fromJS([
        { id: '1', availability: [], title: 'recipe1', isRecommended: false },
        { id: '2', availability: [], title: 'recipe2', isRecommended: false },
        {
          id: '3',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        },
      ])

      const wrapper = shallow(
        <RecipeList recipes={recipes} browserType='mobile' />,
        { context }
      )

      expect(wrapper.find(MobileRecipeList)).toHaveLength(1)
      expect(wrapper.find(TabletRecipeList)).toHaveLength(0)
      expect(wrapper.find(DesktopRecipeList)).toHaveLength(0)
    })
  })

  describe('when in tablet mode', () => {
    test('should render a TabletRecipeList', () => {
      const recipes = Immutable.fromJS([
        { id: '1', availability: [], title: 'recipe1', isRecommended: false },
        { id: '2', availability: [], title: 'recipe2', isRecommended: false },
        {
          id: '3',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        },
      ])

      const wrapper = shallow(
        <RecipeList recipes={recipes} browserType='tablet' />,
        { context }
      )

      expect(wrapper.find(TabletRecipeList)).toHaveLength(1)
      expect(wrapper.find(MobileRecipeList)).toHaveLength(0)
      expect(wrapper.find(DesktopRecipeList)).toHaveLength(0)
    })
  })

  describe('when in desktop mode', () => {
    test('should render a DesktopRecipeList', () => {
      const recipes = Immutable.fromJS([
        { id: '1', availability: [], title: 'recipe1', isRecommended: false },
        { id: '2', availability: [], title: 'recipe2', isRecommended: false },
        {
          id: '3',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        },
      ])

      const wrapper = shallow(
        <RecipeList recipes={recipes} browserType='desktop' />,
        { context }
      )

      expect(wrapper.find(DesktopRecipeList)).toHaveLength(1)
      expect(wrapper.find(TabletRecipeList)).toHaveLength(0)
      expect(wrapper.find(MobileRecipeList)).toHaveLength(0)
    })
  })

  test('should dispatch trackRecipeOrderDisplayed with original and final sorting order', () => {
    const filteredRecipeIds = Immutable.List(['1', '2', '3'])
    const recipes = Immutable.fromJS([
      { id: '3' },
      { id: '1' }
    ])

    const wrapper = shallow(
      <RecipeList
        filteredRecipeIds={filteredRecipeIds}
        recipes={recipes}
      />,
      { context },
    )
    wrapper.instance().componentDidUpdate(wrapper.props())

    expect(context.store.dispatch).toHaveBeenCalledTimes(2)
    expect(context.store.dispatch).toHaveBeenCalledWith(
      'trackRecipeOrderDisplayed return value',
    )
    expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(2)
    expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
      ['1', '2', '3'],
      ['3', '1'],
    )
  })
})
