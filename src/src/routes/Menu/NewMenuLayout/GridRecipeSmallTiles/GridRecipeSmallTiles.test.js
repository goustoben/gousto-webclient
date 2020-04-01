import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Image from 'routes/Menu/Recipe/Image'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import { AddButton } from 'routes/Menu/Recipe/AddButton'

import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'

import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { GridRecipeSmallTiles } from './GridRecipeSmallTiles'

describe('<GridRecipeSmallTiles />', () => {
  let wrapper
  const recipe = {
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
    useWithin: '2-3',
    stock: 100,
    isNew: false,
    position: 23,
    range: Immutable.fromJS({
      name: 'Fine Dine In',
      slug: 'fine-dine-in'
    })
  }
  const view = 'smallGrid'
  let onClickSpy
  beforeEach(() => {
    onClickSpy = jest.fn()
    wrapper = shallow(<GridRecipeSmallTiles {...recipe} view={view} onClick={onClickSpy} unhighlight={() => {}} highlight={() => {}} shouldShowRangeBadge />)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('rendering', () => {
    describe('when a recipe is in stock', () => {
      test('should return a <div>', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should contain one Image component', () => {
        expect(wrapper.find(Image).length).toEqual(1)
      })

      test('should contain one RecipeRating component', () => {
        expect(wrapper.find(RecipeRating).length).toEqual(1)
      })

      test('should contain the recipe title', () => {
        expect(wrapper.find('.titleWrapper').length).toEqual(1)
        expect(wrapper.find('.titleWrapper').render().text()).toEqual('test')
      })

      test('should contain one recipe disclaimer ', () => {
        expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
        expect(wrapper.find(RecipeDisclaimerContainer).prop('id')).toEqual('1')
      })

      test('should contain one AttributeGrid component', () => {
        expect(wrapper.find(AttributeGrid).length).toEqual(1)
      })

      test('should contain one AddButton component', () => {
        expect(wrapper.find(AddButton).length).toEqual(1)
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
    })

    describe('when a recipe is not in stock ', () => {
      beforeEach(() => {
        wrapper.setProps({ stock: 0 })
        wrapper.setProps({ inBasket: false })
      })

      test('should not contain one AttributeGrid component', () => {
        expect(wrapper.find(AttributeGrid).length).toEqual(0)
      })

      test('should not contain one RecipeRating component', () => {
        expect(wrapper.find(RecipeRating).length).toEqual(0)
      })
    })

    describe('when shouldShowRangeBadge is true', () => {
      test('should render rangeBadgeWrapper', () => {
        expect(wrapper.find('.rangeBadgeWrapper')).toHaveLength(1)
      })
    })
  })

  describe('When click on Image', () => {
    test('should call onClick function with recipeId', () => {
      wrapper.find('.recipeImage').simulate('click')
      expect(onClickSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('When click on Title', () => {
    test('should call onClick function with recipeId', () => {
      wrapper.find('.titleWrapper').simulate('click')
      expect(onClickSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('When keypress on Image', () => {
    test('should call onClick function with recipeId', () => {
      wrapper.find('.recipeImage').simulate('keypress', {key: 'Enter'})
      expect(onClickSpy).toHaveBeenCalledWith('1')
    })
  })

  describe('When keypress on Title', () => {
    test('should call onClick function with recipeId', () => {
      wrapper.find('.titleWrapper').simulate('keypress', {key: 'Enter'})
      expect(onClickSpy).toHaveBeenCalledWith('1')
    })
  })
})
