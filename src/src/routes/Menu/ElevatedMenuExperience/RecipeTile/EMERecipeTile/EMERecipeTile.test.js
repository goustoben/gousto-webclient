import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTile } from './EMERecipeTile'
import { TileImageContainer } from '../TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTagTitle } from '../RecipeTagTitle'
import { RecipeTilePurchaseInfoContainer } from '../RecipeTilePurchaseInfo'

describe('EMERecipeTile', () => {
  let wrapper
  let defaultProps
  beforeEach(() => {
    defaultProps = {
      recipe: Immutable.fromJS({
        id: '1234',
        title: 'Bobs Brilliant Beef Burger',
        url: 'example.com/food',
        media: {
          images: []
        }
      }),
      recipeId: '1234',
      index: 0,
      numPortions: 2,
      showDetailRecipe: jest.fn(),
      title: 'Bobs Brilliant Beef Burger',
      isOutOfStock: false,
      surcharge: 0,
      brandTags: {
        topLeftTag: {
          type: 'general',
          slug: 'new-eme',
          text: 'New',
          themes: undefined,
          theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
        },
        topRightTag: {
          type: 'general',
          slug: 'joe-wicks-eme',
          text: 'Joe Wicks',
          themes: undefined,
          theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
        }
      }
    }
  })
  describe('when given null recipe', () => {
    test('should return null', () => {
      wrapper = shallow(<EMERecipeTile
        {...defaultProps}
        recipe={null}
      />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given undefined recipe', () => {
    test('should return null', () => {
      wrapper = shallow(<EMERecipeTile
        {...defaultProps}
        recipe={undefined}
      />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given a recipe', () => {
    global.innerWidth = 1200
    beforeEach(() => {
      wrapper = shallow(<EMERecipeTile
        {...defaultProps}
      />)
    })

    describe('when a recipe is in stock', () => {
      test('should return a <div>', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should contain one TileImageContainer component', () => {
        expect(wrapper.find(TileImageContainer).length).toEqual(1)
      })

      test('should contain a title', () => {
        expect(wrapper.find('h2').length).toEqual(1)
      })

      test('should contain one RecipeTag component', () => {
        expect(wrapper.find(RecipeTag).length).toEqual(1)
      })

      test('should contain one RecipeTagTitle component', () => {
        expect(wrapper.find(RecipeTagTitle).length).toEqual(1)
      })
      test('should contain an RecipeTilePurchaseInfoContainer ', () => {
        expect(wrapper.find(RecipeTilePurchaseInfoContainer).length).toEqual(1)
      })
    })

    describe('when a recipe is not in stock', () => {
      beforeEach(() => {
        wrapper = shallow(<EMERecipeTile
          {...defaultProps}
          isOutOfStock
        />)
      })

      test('should contain one TileImageContainer component', () => {
        expect(wrapper.find(TileImageContainer).length).toEqual(1)
      })

      test('should contain a title ', () => {
        expect(wrapper.find('h2').length).toEqual(1)
        expect(wrapper.find('h2').text()).toEqual('Bobs Brilliant Beef Burger')
      })
    })

    describe('when hovering over TileImage', () => {
      beforeEach(() => {
        wrapper = shallow(<EMERecipeTile
          {...defaultProps}
        />)
      })

      test('should set detailHover state to true', () => {
        wrapper.find('.titleWrapper').simulate('mouseEnter')
        expect(wrapper.state().detailHover).toBe(true)
      })

      test('should set detailHover state to false', () => {
        wrapper.find('.titleWrapper').simulate('mouseLeave')
        expect(wrapper.state().detailHover).toBe(false)
      })
    })
  })
})
