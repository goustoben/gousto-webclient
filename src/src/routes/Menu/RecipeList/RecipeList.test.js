import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeList } from './RecipeList'
import { EMERecipeTileContainer } from '../ElevatedMenuExperience/RecipeTile/EMERecipeTile'

describe('RecipeList', () => {
  let trackRecipeOrderDisplayed
  let wrapper
  beforeEach(() => {
    trackRecipeOrderDisplayed = jest.fn()
    trackRecipeOrderDisplayed.mockClear()
  })

  describe('trackRecipeOrderDisplayed', () => {
    const recipes = Immutable.List([
      {
        originalId: '3',
        recipe: Immutable.Map({
          id: '3',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        })
      },
      {
        originalId: '1',
        recipe: Immutable.Map({ id: '1', availability: [], title: 'recipe1', isRecommended: false })
      }
    ])
    describe('when the recipe list is initially rendered', () => {
      test('should dispatch trackRecipeOrderDisplayed once', () => {
        const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

        shallow(
          <RecipeList
            originalOrderRecipeIds={originalOrderRecipeIds}
            recipes={recipes}
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
            currentCollectionId="123"
          />,
        )

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
          ['1', '2', '3'],
          ['3', '1'],
        )
      })
    })

    describe('when the recipe collection selection is changed', () => {
      test('should dispatch trackRecipeOrderDisplayed an additional time', () => {
        const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

        wrapper = shallow(
          <RecipeList
            originalOrderRecipeIds={originalOrderRecipeIds}
            recipes={recipes}
            currentCollectionId="123"
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
          />,
        )
        wrapper.setProps({
          currentCollectionId: '321',
        })

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(2)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
          ['1', '2', '3'],
          ['3', '1'],
        )
      })
    })

    describe('when the recipe collection remains the same', () => {
      test('should not dispatch trackRecipeOrderDisplayed after initial render', () => {
        const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

        wrapper = shallow(
          <RecipeList
            originalOrderRecipeIds={originalOrderRecipeIds}
            recipes={recipes}
            currentCollectionId="123"
            trackRecipeOrderDisplayed={trackRecipeOrderDisplayed}
          />,
        )
        wrapper.setProps({
          currentCollectionId: '123',
        })

        expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
        expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
          ['1', '2', '3'],
          ['3', '1'],
        )
      })
    })
  })
  describe('when there are no recipes', () => {
    test('then it should render nothing', () => {
      wrapper = shallow(
        <RecipeList recipes={Immutable.List([])} trackRecipeOrderDisplayed={trackRecipeOrderDisplayed} currentCollectionId="123" />,
      )
      expect(wrapper.find(EMERecipeTileContainer).exists()).toBe(false)
    })
  })

  describe('when there is one recipe', () => {
    beforeEach(() => {
      const recipes = Immutable.List([
        {
          originalId: '3',
          recipe: Immutable.Map({
            id: '3',
            availability: [],
            title: 'recipe3',
            boxType: 'vegetarian',
            dietType: 'Vegetarian',
            isRecommended: false,
          })
        }
      ])

      wrapper = shallow(
        <RecipeList recipes={recipes} trackRecipeOrderDisplayed={trackRecipeOrderDisplayed} currentCollectionId="123" />,
      )
    })
    test('then it should render one EMERecipeTileContainer', () => {
      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(1)
    })
  })

  describe('when there are multiple recipes', () => {
    beforeEach(() => {
      const recipes = Immutable.List([
        {
          originalId: '3',
          recipe: Immutable.Map({
            id: '3',
            availability: [],
            title: 'recipe3',
            boxType: 'vegetarian',
            dietType: 'Vegetarian',
            isRecommended: false,
          })
        },
        {
          originalId: '1',
          recipe: Immutable.Map({
            id: '1',
            availability: [],
            title: 'recipe1',
            isRecommended: false
          })
        }
      ])

      wrapper = shallow(
        <RecipeList recipes={recipes} trackRecipeOrderDisplayed={trackRecipeOrderDisplayed} currentCollectionId="123" />,
      )
    })
    test('then it should render multiple EMERecipeTileContainer', () => {
      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(2)
    })
  })
})
