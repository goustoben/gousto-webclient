import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { Pill } from 'goustouicomponents'

import { RecipeTile } from './RecipeTile'

import { RecipeDisclaimerContainer } from '../RecipeDisclaimer'
import { RecipeImageContainer } from './Image'
import { RecipeRatingContainer } from './Rating'
import { AddRecipe } from './AddRecipe'
import { AttributeGridContainer } from './AttributeGrid'
import { VariantHeaderContainer } from './VariantHeader'
import { TitleContainer } from './Title/TitleContainer'

describe('RecipeTile', () => {
  describe('when given null recipe', () => {
    test('should return null', () => {
      const wrapper = shallow(<RecipeTile recipe={null} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given undefined recipe', () => {
    test('should return null', () => {
      const wrapper = shallow(<RecipeTile recipe={undefined} numPortions={2} index={0} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given a recipe', () => {
    global.innerWidth = 1200
    const showDetailRecipe = jest.fn()
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      media: {
        images: []
      }
    })
    const wrapper = shallow(<RecipeTile recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} showDetailRecipe={showDetailRecipe} />)

    describe('when a recipe is in stock', () => {
      test('should return a <div>', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should contain one RecipeImageContainer component', () => {
        expect(wrapper.find(RecipeImageContainer).length).toEqual(1)
      })

      test('should contain one RecipeRatingContainer component', () => {
        expect(wrapper.find(RecipeRatingContainer).length).toEqual(1)
      })

      test('should contain TitleContainer', () => {
        expect(wrapper.find(TitleContainer).length).toEqual(1)
        expect(wrapper.find(TitleContainer).prop('recipeId')).toEqual('1234')
      })

      test('should contain one recipe disclaimer ', () => {
        expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
        expect(wrapper.find(RecipeDisclaimerContainer).prop('recipeId')).toEqual('1234')
      })

      test('should contain one AttributeGridContainer component', () => {
        expect(wrapper.find(AttributeGridContainer).length).toEqual(1)
      })

      test('should contain one AddRecipe component', () => {
        expect(wrapper.find(AddRecipe).length).toEqual(1)
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

      test('should contain one Pill component and icon prop is true', () => {
        expect(wrapper.find(Pill).length).toBe(1)
        expect(wrapper.find(Pill).prop('icon')).toBe(true)
      })

      describe('when click on Pill', () => {
        test('should call showDetailRecipe', () => {
          wrapper.find(Pill).simulate('click')
          expect(showDetailRecipe).toHaveBeenCalled()
        })
      })

      test('should contain one VariantHeader component', () => {
        const component = wrapper.find(VariantHeaderContainer)
        expect(component.length).toBe(1)
      })
    })

    describe('when a recipe is not in stock ', () => {
      beforeEach(() => {
        wrapper.setProps({ isOutOfStock: true })
      })

      test('should not contain one Pill component', () => {
        expect(wrapper.find(Pill).length).toBe(0)
      })

      test('should not contain one AttributeGridContainer component', () => {
        expect(wrapper.find(AttributeGridContainer).length).toEqual(0)
      })

      test('should not contain one RecipeRatingContainer component', () => {
        expect(wrapper.find(RecipeRatingContainer).length).toEqual(0)
      })

      test('should send outOfStock to AddRecipe button', () => {
        expect(wrapper.find(AddRecipe).prop('isOutOfStock')).toEqual(true)
      })
    })

    test('should render an AddRecipe with the correct props', () => {
      const addRecipe = wrapper.find(AddRecipe)

      expect(addRecipe.prop('id')).toEqual('1234')
      expect(addRecipe.prop('position')).toEqual(3)
      expect(addRecipe.prop('view')).toEqual('grid')
    })
  })

  describe('when given a fine dine in recipe', () => {
    global.innerWidth = 1200
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      isFineDineIn: true,
      media: {
        images: []
      }
    })
    const wrapper = shallow(<RecipeTile recipe={recipe} recipeId={recipe.get('id')} index={index} numPortions={2} />)

    test('should not render RecipeRatingContainer', () => {
      expect(wrapper.find(RecipeRatingContainer)).toHaveLength(0)
    })

    test('should apply fineDineInStyle class name', () => {
      expect(wrapper.find('.fineDineInStyle')).toHaveLength(1)
    })

    test('should send maxNoAttributes 2 to AttributeGridContainer', () => {
      expect(wrapper.find(AttributeGridContainer).prop('maxNoAttributes')).toEqual(2)
    })

    test('should render an AddRecipe with the correct props', () => {
      const addRecipe = wrapper.find(AddRecipe)

      expect(addRecipe.prop('id')).toEqual('1234')
      expect(addRecipe.prop('position')).toEqual(3)
      expect(addRecipe.prop('view')).toEqual('fineDineIn')
    })
  })

  describe('when given a chef prepared meal', () => {
    const index = 3
    const recipe = Immutable.fromJS({
      id: '1234',
      title: 'Bobs Brilliant Beef Burger',
      url: 'example.com/food',
      chefPrepared: true,
      isFineDineIn: false
    })
    const wrapper = shallow(<RecipeTile recipe={recipe} index={index} numPortions={2} />)
    test('should render an AddRecipe with the correct view', () => {
      const addRecipe = wrapper.find(AddRecipe)

      expect(addRecipe.prop('view')).toEqual('chefPrepared')
    })
  })
})
