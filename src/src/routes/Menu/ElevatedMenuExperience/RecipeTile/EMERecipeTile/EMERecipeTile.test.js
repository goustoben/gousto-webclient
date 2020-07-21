import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTile } from './EMERecipeTile'
import { TileImageContainer } from '../TileImage'

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
      isMobile: false,
      surcharge: 0,
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

      test('should contain a title ', () => {
        expect(wrapper.find('h2').length).toEqual(1)
      })
    })

    describe('When the recipe has a surcharge', () => {
      beforeEach(() => {
        wrapper = shallow(<EMERecipeTile
          {...defaultProps}
          surcharge={0.75}
        />)
      })
      test('then it should render surcharge info', () => {
        expect(wrapper.find('.surchargeAmountText')).toHaveLength(1)
        expect(wrapper.find('.perServingText')).toHaveLength(1)
      })

      describe('when the surcharge prop is more than two decimal places', () => {
        test('should render the surcharge per portion to the nearest 1p', () => {
          wrapper = shallow(<EMERecipeTile
            {...defaultProps}
            surcharge={1.992342}
          />)

          expect(wrapper.find('.surchargeAmountText').text()).toEqual('+£1.99')
        })
        test('should add 2 zeros for a whole number', () => {
          wrapper = shallow(<EMERecipeTile
            {...defaultProps}
            surcharge={2}
          />)

          expect(wrapper.find('.surchargeAmountText').text()).toEqual('+£2.00')
        })
      })
      describe('when the surcharge provided is zero', () => {
        test('should render nothing', () => {
          wrapper = shallow(<EMERecipeTile
            {...defaultProps}
            surcharge={0}
          />)
          expect(wrapper.find('.surchargeAmountText')).toHaveLength(0)
        })
      })
      describe('when the recipe is out of stock', () => {
        test('should render nothing', () => {
          wrapper = shallow(<EMERecipeTile
            {...defaultProps}
            surcharge={2}
            isOutOfStock
          />)
          expect(wrapper.find('.surchargeInfo')).toHaveLength(0)
        })
      })
    })
  })
})
