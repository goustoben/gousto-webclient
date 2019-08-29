import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Title from 'Recipe/Title'
import RangeBadge from 'Recipe/RangeBadge'
import AddButton from 'Recipe/AddButton'
import StockBadge from 'Recipe/StockBadge'
import TasteScore from 'Recipe/TasteScore'

import FineDineInRecipe from 'Recipe/FineDineInRecipe'
import { ShortlistButton } from 'Recipe/ShortlistButton'

describe('<FineDineInRecipe />', () => {
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
      const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)
      expect(wrapper.type()).toBe('div')
    })

    test('should contain one Title component', () => {
      const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(Title).length).toEqual(1)
    })

    test('should contain one Range Badge component', () => {
      const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(RangeBadge).length).toEqual(1)
    })

    test('should contain one AddButton component', () => {
      const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(AddButton).length).toEqual(1)
    })

    test('should contain one StockBadge component', () => {
      const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

      expect(wrapper.find(StockBadge).length).toEqual(1)
    })

    test('should contain a TasteScore component', () => {
      const wrapper = shallow(<FineDineInRecipe tasteScore={95} view={view} />)

      expect(wrapper.find(TasteScore)).toHaveLength(1)
      expect(wrapper.find(TasteScore).prop('score')).toEqual(95)
    })

    test('should contain one ShortlistButton if feature flag is showShortlistButton is true and onMobile is true', () => {
      const wrapper = shallow(<FineDineInRecipe />)
      wrapper.setProps({ showShortlistButton: true, isOnMobile: true})
      expect(wrapper.find(ShortlistButton).length).toBe(1)
    })
  })
})
