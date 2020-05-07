import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { Title } from 'routes/Menu/Recipe/Title'
import Image from 'routes/Menu/Recipe/Image'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import { ChefQuote } from 'routes/Menu/Recipe/ChefQuote'
import { AddRecipe } from 'routes/Menu/Recipe/AddRecipe'

import { GridRecipe } from 'routes/Menu/Recipe/GridRecipe'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'

import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { VariantHeaderContainer } from '../../VariantHeader'

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
      recipeVariants: null,
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

      test('should contain one Title component', () => {
        expect(wrapper.find(Title).length).toEqual(1)
      })

      test('should contain one recipe disclaimer ', () => {
        expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
        expect(wrapper.find(RecipeDisclaimerContainer).prop('id')).toEqual('1')
      })

      test('should contain one AttributeGrid component', () => {
        expect(wrapper.find(AttributeGrid).length).toEqual(1)
      })

      test('should contain one AddRecipe component', () => {
        expect(wrapper.find(AddRecipe).length).toEqual(1)
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
        expect(wrapper.find(Pill).length).toBe(1)
        expect(wrapper.find(Pill).prop('icon')).toBe(true)
      })

      test('should contain one VariantHeader component', () => {
        const component = wrapper.find(VariantHeaderContainer)
        expect(component.length).toBe(1)
      })
    })

    describe('when a recipe is not in stock ', () => {
      beforeEach(() => {
        wrapper.setProps({ stock: 0 })
        wrapper.setProps({ inBasket: false })
      })

      test('should not contain one Pill component', () => {
        expect(wrapper.find(Pill).length).toBe(0)
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

      test('should not contain one AttributeGrid component', () => {
        expect(wrapper.find(AttributeGrid).length).toEqual(0)
      })

      test('should not contain one RecipeRating component', () => {
        expect(wrapper.find(RecipeRating).length).toEqual(0)
      })
    })
  })
})
