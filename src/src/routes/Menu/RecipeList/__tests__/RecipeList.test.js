import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { trackRecipeOrderDisplayed } from 'actions/tracking'

import { RecipeList } from '../RecipeList'
import { SingleColumnRecipeList } from '../SingleColumnRecipeList'
import { ThreeColumnRecipeList } from '../ThreeColumnRecipeList'
import { OptimizelyRolloutsContainer } from '../../../../containers/OptimizelyRollouts'
import { EMERecipeList } from '../../ElevatedMenuExperience/EMERecipeList'

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

  describe('when featureEnabled is false', () => {
    beforeEach(() => {
      context.store.dispatch.mockClear()
      trackRecipeOrderDisplayed.mockClear()
    })

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

    describe('when in mobile mode', () => {
      test('should render a SingleColumnRecipeList', () => {
        const wrapper = shallow(
          <RecipeList recipes={recipes} browserType="mobile" />,
          { context }
        )

        expect(wrapper.find(SingleColumnRecipeList)).toHaveLength(1)
        expect(wrapper.find(ThreeColumnRecipeList)).toHaveLength(0)
      })
    })

    describe('when in tablet mode', () => {
      test('should render a ThreeColumnRecipeList', () => {
        const wrapper = shallow(
          <RecipeList recipes={recipes} browserType="tablet" />,
          { context }
        )

        expect(wrapper.find(ThreeColumnRecipeList)).toHaveLength(1)
        expect(wrapper.find(SingleColumnRecipeList)).toHaveLength(0)
      })
    })

    describe('when in desktop mode', () => {
      test('should render a ThreeColumnRecipeList', () => {
        const wrapper = shallow(
          <RecipeList recipes={recipes} browserType="desktop" />,
          { context }
        )

        expect(wrapper.find(ThreeColumnRecipeList)).toHaveLength(1)
        expect(wrapper.find(SingleColumnRecipeList)).toHaveLength(0)
      })
    })

    describe('trackRecipeOrderDisplayed', () => {
      describe('when the recipe list is initially rendered', () => {
        test('should dispatch trackRecipeOrderDisplayed once', () => {
          const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

          shallow(
            <RecipeList
              originalOrderRecipeIds={originalOrderRecipeIds}
              recipes={recipes}
            />,
            { context },
          )

          expect(context.store.dispatch).toHaveBeenCalledTimes(1)
          expect(context.store.dispatch).toHaveBeenCalledWith(
            'trackRecipeOrderDisplayed return value',
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

          const wrapper = shallow(
            <RecipeList
              originalOrderRecipeIds={originalOrderRecipeIds}
              recipes={recipes}
              currentCollectionId="123"
            />,
            { context },
          )
          wrapper.setProps({
            currentCollectionId: '321',
          })

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

      describe('when the recipe collection remains the same', () => {
        test('should not dispatch trackRecipeOrderDisplayed after initial render', () => {
          const originalOrderRecipeIds = Immutable.List(['1', '2', '3'])

          const wrapper = shallow(
            <RecipeList
              originalOrderRecipeIds={originalOrderRecipeIds}
              recipes={recipes}
              currentCollectionId="123"
            />,
            { context },
          )
          wrapper.setProps({
            currentCollectionId: '123',
          })

          expect(context.store.dispatch).toHaveBeenCalledTimes(1)
          expect(context.store.dispatch).toHaveBeenCalledWith(
            'trackRecipeOrderDisplayed return value',
          )
          expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
          expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
            ['1', '2', '3'],
            ['3', '1'],
          )
        })
      })
    })

    describe('when render desktop component default', () => {
      let wrapper
      beforeEach(() => {
        context.store.dispatch.mockClear()
        trackRecipeOrderDisplayed.mockClear()

        wrapper = shallow(
          <RecipeList recipes={recipes} browserType="desktop" />,
          { context }
        )
      })

      test('should render OptimizelyRolloutsContainer with featureEnabled false for ThreeColumnRecipeList', () => {
        expect(wrapper.find(OptimizelyRolloutsContainer).at(1).prop('featureEnabled')).toBe(false)
        expect(wrapper.find(OptimizelyRolloutsContainer).at(1).children(ThreeColumnRecipeList)).toHaveLength(1)
      })
    })
  })

  describe('when featureEnabled is true', () => {
    let wrapper
    beforeEach(() => {
      context.store.dispatch.mockClear()
      trackRecipeOrderDisplayed.mockClear()
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

      wrapper = shallow(
        <RecipeList recipes={recipes} browserType="desktop" />,
        { context }
      )
    })

    test('should render OptimizelyRolloutsContainer with featureEnabled true for EMERecipeList', () => {
      expect(wrapper.find(OptimizelyRolloutsContainer).first().prop('featureEnabled')).toBe(true)
      expect(wrapper.find(OptimizelyRolloutsContainer).first().children(EMERecipeList)).toHaveLength(1)
    })
  })
})
