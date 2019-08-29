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
import { AttributeGrid } from 'Recipe/AttributeGrid'

import { Pill } from 'goustouicomponents'
import { ShortlistButton } from 'Recipe/ShortlistButton'

describe('<GridRecipe />', () => {
  describe('rendering', () => {
    let wrapper
    let recipe = {
      id: '1',
      title: 'test',
      rating: {
        count: 1,
        average: 4,
      },
      url: '',
      cookingTime: 1,
      cookingTimeFamily: 1,
      shelfLifeDays: '',
      media: Immutable.fromJS([
        {},
        {},
        {
          src: 'test',
        },
      ]),
      diet: 'meat',
    }
    let view = 'grid'

    beforeEach(() => {
      wrapper = shallow(<GridRecipe {...recipe} view={view} />)
    })

    test('should return a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should contain one Image component', () => {
      expect(wrapper.find(Image).length).toEqual(1)
    })

    test('should contain one Rating component', () => {
      expect(wrapper.find(Rating).length).toEqual(1)
    })

    test('should contain one Title component', () => {
      expect(wrapper.find(Title).length).toEqual(1)
    })

    test('should contain one TasteScore component', () => {
      wrapper.setProps({ tasteScore: 99 })

      expect(wrapper.find(TasteScore)).toHaveLength(1)
      expect(wrapper.find(TasteScore).prop('score')).toEqual(99)
    })

    test('should contain one AttributeGrid component', () => {
      expect(wrapper.find(AttributeGrid).length).toEqual(1)
    })

    test('should contain one RecommendedBadge component', () => {
      expect(wrapper.find(RecommendedBadge).length).toEqual(1)
    })

    test('should contain one AddButton component', () => {
      expect(wrapper.find(AddButton).length).toEqual(1)
    })

    test('should contain one StockBadge component', () => {
      expect(wrapper.find(StockBadge).length).toEqual(1)
    })

    test('should contain one DisabledOverlay component', () => {
      expect(wrapper.find(DisabledOverlay).length).toEqual(1)
    })

    test('should not contain a ChefQuote component', () => {
      expect(wrapper.find(ChefQuote).length).toEqual(0)
    })

    test('should not have a background image', () => {
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
      expect(wrapper.find(Title).prop('large')).toBe(undefined)
    })

    test('should render range ribbon for 10 min range recipe', () => {
      recipe = {
        id: '1',
        title: 'test',
        rating: {
          count: 1,
          average: 4,
        },
        url: '',
        cookingTime: 1,
        cookingTimeFamily: 1,
        shelfLifeDays: '',
        media: Immutable.fromJS([
          {},
          {},
          {
            src: 'test',
          },
        ]),
        diet: 'meat',
        range: 'ten_to_table',

      }
      view = 'grid'

      wrapper.setProps({ range: recipe.range })
      expect(wrapper.find('RangeBadge').prop('range')).toEqual('ten_to_table')
    })

    test('should contain one Pill component and icon prop is true', () => {
      wrapper.setProps({ showRecipeDetailsButton: true })
      expect(wrapper.find(Pill).length).toBe(1)
      expect(wrapper.find(Pill).prop('icon')).toBe(true)
    })

    test('should contain one ShortlistButton if feature flag is showShortlistButton is true and onMobile is true', () => {
      wrapper.setProps({ showShortlistButton: true, isOnMobile: true})
      expect(wrapper.find(ShortlistButton).length).toBe(1)
    })
  })
})
