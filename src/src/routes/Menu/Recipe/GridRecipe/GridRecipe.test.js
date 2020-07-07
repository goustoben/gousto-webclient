import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Image } from 'routes/Menu/Recipe/Image'
import { AddRecipe } from 'routes/Menu/Recipe/AddRecipe'

import { GridRecipe } from 'routes/Menu/Recipe/GridRecipe'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'

import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { VariantHeaderContainer } from '../VariantHeader'
import { TitleContainer } from '../Title'
import { RecipeRatingContainer } from '../Rating'

describe('<GridRecipe />', () => {
  describe('rendering', () => {
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
      recipeVariants: null,
      media: Immutable.fromJS([
        {},
        {},
        {
          src: 'test',
        },
      ]),
      diet: 'meat',
      useWithin: '2-3',
      isOutOfStock: false,
      originalId: '2',
      onClick: () => {},
      highlight: () => {},
      unhighlight: () => {},
      roundelImage: {
        media: {},
        name: '',
        celebrity: false,
      },
      view: 'grid',
      detailHover: true,
      equipment: Immutable.List(),
    }
    const view = 'grid'

    beforeEach(() => {
      wrapper = shallow(<GridRecipe {...recipe} view={view} />)
    })

    describe('when a recipe is in stock', () => {
      test('should return a <div>', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should contain one Image component', () => {
        expect(wrapper.find(Image).length).toEqual(1)
      })

      test('should contain one RecipeRatingContainer component', () => {
        expect(wrapper.find(RecipeRatingContainer).length).toEqual(1)
      })

      test('should contain TitleContainer', () => {
        expect(wrapper.find(TitleContainer).length).toEqual(1)
        expect(wrapper.find(TitleContainer).prop('recipeId')).toEqual('1')
      })

      test('should contain one recipe disclaimer ', () => {
        expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
        expect(wrapper.find(RecipeDisclaimerContainer).prop('recipeId')).toEqual('1')
      })

      test('should contain one AttributeGrid component', () => {
        expect(wrapper.find(AttributeGrid).length).toEqual(1)
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
        const onClickSpy = jest.fn()
        test('should call onClick', () => {
          wrapper.setProps({onClick: onClickSpy})
          wrapper.find(Pill).simulate('click')
          expect(onClickSpy).toHaveBeenCalled()
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

      test('should not contain one AttributeGrid component', () => {
        expect(wrapper.find(AttributeGrid).length).toEqual(0)
      })

      test('should not contain one RecipeRatingContainer component', () => {
        expect(wrapper.find(RecipeRatingContainer).length).toEqual(0)
      })

      test('should send outOfStock to AddRecipe button', () => {
        expect(wrapper.find(AddRecipe).prop('isOutOfStock')).toEqual(true)
      })
    })

    describe('when recipe render fineDineInStyle ', () => {
      beforeEach(() => {
        wrapper.setProps({ fineDineInStyle: true, isOutOfStock: false })
      })

      test('should not render RecipeRatingContainer', () => {
        expect(wrapper.find(RecipeRatingContainer)).toHaveLength(0)
      })

      test('should apply fineDineInStyle class name', () => {
        expect(wrapper.find('.fineDineInStyle')).toHaveLength(1)
      })

      test('should send maxNoAttributes 2 to AttributeGrid', () => {
        expect(wrapper.find(AttributeGrid).prop('maxNoAttributes')).toEqual(2)
      })
    })
  })
})
