import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Title from 'Recipe/Title'
import Image from 'Recipe/Image'
import Rating from 'Recipe/Rating'
import ChefQuote from 'Recipe/ChefQuote'
import AddButton from 'Recipe/AddButton'
import StockBadge from 'Recipe/StockBadge'
import TasteScore from 'Recipe/TasteScore'
import DisabledOverlay from 'Recipe/DisabledOverlay'
import RecommendedBadge from 'Recipe/RecommendedBadge'

import GridRecipe from 'Recipe/GridRecipe'
import { RecipeAttribute } from 'Recipe/RecipeAttribute'

describe('<GridRecipe />', () => {
  describe('rendering', () => {
    let recipe
    let view
    beforeEach(() => {
      recipe = Immutable.fromJS({
        id: 1,
        title: 'test',
        rating: {
          count: 1,
          average: 4,
        },
        url: '',
        cookingTime: 1,
        cookingTimeFamily: 1,
        shelfLifeDays: '',
        media: {
          images: [
            {
              urls: [
                {},
                {},
                {
                  src: 'test',
                },
              ],
            },
          ],
        },
      })
      view = 'grid'
    })

    test('should return a <div>', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)
      expect(wrapper.type()).toBe('div')
    })

    test('should contain one Image component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(Image).length).toEqual(1)
    })

    test('should contain one Rating component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(Rating).length).toEqual(1)
    })

    test('should contain one Title component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(Title).length).toEqual(1)
    })

    test('should contain one TasteScore component', () => {
      const wrapper = shallow(<GridRecipe tasteScore={99} view={view} />)

      expect(wrapper.find(TasteScore)).toHaveLength(1)
      expect(wrapper.find(TasteScore).prop('score')).toEqual(99)
    })

    test('should contain one "cooking time" recipe attribute component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(RecipeAttribute).find({attributeName:'cookingTime'}).length).toEqual(1)
    })

    test('should contain one "use within" recipe attribute component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(RecipeAttribute).find({attributeName:'useWithin'}).length).toEqual(1)
    })

    test('should contain one RecommendedBadge component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(RecommendedBadge).length).toEqual(1)
    })

    test('should contain one AddButton component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(AddButton).length).toEqual(1)
    })

    test('should contain one StockBadge component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(StockBadge).length).toEqual(1)
    })

    test('should contain one DisabledOverlay component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(DisabledOverlay).length).toEqual(1)
    })

    test('should contain one "use within" recipe attribute component with view "notice"', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)
      const component = wrapper.find(RecipeAttribute).find({attributeName:'equipmentRequired'})

      expect(component.length).toBe(1)
      expect(component.prop('view')).toBe('notice')
    })

    test('should not contain a ChefQuote component', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(ChefQuote).length).toEqual(0)
    })

    test('should not have a background image', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)
      expect(
        wrapper
          .find('div')
          .at(0)
          .children('div')
          .at(0)
          .prop('style'),
      ).toBe(undefined)
    })

    test('the title component should not be large', () => {
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(Title).prop('large')).toBe(undefined)
    })

    test('should render range ribbon for 10 min range recipe', () => {
      recipe = Immutable.fromJS({
        id: 1,
        title: 'test',
        rating: {
          count: 1,
          average: 4,
        },
        url: '',
        cookingTime: 1,
        cookingTimeFamily: 1,
        shelfLifeDays: '',
        range: 'ten_to_table',
        media: {
          images: [
            {
              urls: [
                {
                  src: 'test',
                },
              ],
            },
          ],
        },
      })
      view = 'grid'
      const wrapper = shallow(<GridRecipe recipe={recipe} view={view} range={recipe.get('range')} />)
      expect(wrapper.find('RangeBadge').prop('range')).toEqual('ten_to_table')
    })
  })
})
