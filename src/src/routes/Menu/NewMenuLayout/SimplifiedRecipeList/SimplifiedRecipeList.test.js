import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { SimplifiedRecipeList } from './SimplifiedRecipeList'
import { GridRecipeSmallTilesContainer } from '../GridRecipeSmallTiles'

describe('Given SimplifiedRecipeList', () => {
  let wrapper
  const recipes = Immutable.fromJS([
    { id: '3', availability: [], title: 'recipe1', isRecommended: false },
    { id: '1', availability: [], title: 'recipe2', isRecommended: false },
    {
      id: '2',
      availability: [],
      title: 'recipe3',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    },
  ])
  const recipeIds = Immutable.fromJS(['1', '2', '3'])
  describe('When render', () => {
    const trackRecipeOrderDisplayedSpy = jest.fn()
    beforeEach(() => {
      wrapper = shallow(
        <SimplifiedRecipeList
          recipes={recipes}
          recipeIds={recipeIds}
          trackRecipeOrderDisplayed={trackRecipeOrderDisplayedSpy}
          changeCollectionToAllRecipesViaCTA={ () => {}}
          isCurrentCollectionRecommendation={false}
          currentCollectionTitle="Vegetarian"
        />)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
    test('then it should have state detailHover false', () => {
      expect(wrapper.state()).toEqual({
        detailHover: false
      })
    })

    test('then it should call trackRecipeOrderDisplayed', () => {
      const recipeIdsArray = ['1', '2', '3']
      const displayedOrderIds = ['3', '1', '2']
      expect(trackRecipeOrderDisplayedSpy).toHaveBeenCalledWith(recipeIdsArray, displayedOrderIds)
    })

    test('then it should render 3 GridRecipeSmallTilesContainer', () => {
      expect(wrapper.find(GridRecipeSmallTilesContainer)).toHaveLength(3)
    })

    test('then it should render the CollectionsHeader', () => {
      expect(wrapper.find('CollectionsHeader')).toHaveLength(1)
    })
  })

  describe('When updateState', () => {
    const trackRecipeOrderDisplayedSpy = jest.fn()
    beforeEach(() => {
      wrapper = shallow(
        <SimplifiedRecipeList
          recipes={recipes}
          recipeIds={recipeIds}
          trackRecipeOrderDisplayed={trackRecipeOrderDisplayedSpy}
          changeCollectionToAllRecipesViaCTA={ () => {}}
          isCurrentCollectionRecommendation={false}
          currentCollectionTitle="Vegetarian"
        />)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })
    test('then should call trackRecipeOrderDisplayed', () => {
      const recipeIdsArray = ['1', '2', '3']
      const displayedOrderIds = ['3', '1', '2']
      expect(trackRecipeOrderDisplayedSpy).toHaveBeenNthCalledWith(1, recipeIdsArray, displayedOrderIds)
      wrapper.instance().highlight()
      expect(trackRecipeOrderDisplayedSpy).toHaveBeenNthCalledWith(2, recipeIdsArray, displayedOrderIds)
    })
  })

  describe('When call unhighlight', () => {
    test('then should have state detailHover false', () => {
      wrapper.instance().unhighlight()
      expect(wrapper.state()).toEqual({
        detailHover: false
      })
    })
  })

  describe('When call highlight', () => {
    test('then should have state detailHover false', () => {
      wrapper.instance().highlight()
      expect(wrapper.state()).toEqual({
        detailHover: true
      })
    })
  })
})
