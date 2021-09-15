import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeTile } from './RecipeTile'
import { TileImageContainer } from './TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTagTitle } from './RecipeTagTitle'
import { RecipeTilePurchaseInfoContainer } from './RecipeTilePurchaseInfo'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList/VariantRecipeListContainer'
import { Title } from '../Recipe'

describe('RecipeTile', () => {
  let wrapper
  let defaultProps
  const recipeId = '1234'
  beforeEach(() => {
    defaultProps = {
      recipe: Immutable.fromJS({
        id: recipeId,
        title: 'Bobs Brilliant Beef Burger',
        url: 'example.com/food',
        media: {
          images: []
        }
      }),
      recipeId,
      index: 0,
      numPortions: 2,
      showDetailRecipe: jest.fn(),
      isOutOfStock: false,
      isFineDineIn: false,
      surcharge: 0,
      brandAvailability: {
        type: 'general',
        slug: 'new-eme',
        text: 'New',
        themes: undefined,
        theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
      },
      brandTagline: {
        type: 'general',
        slug: 'joe-wicks-eme',
        text: 'Joe Wicks',
        themes: undefined,
        theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
      }
    }
  })
  describe('when given null recipe', () => {
    test('should return null', () => {
      wrapper = shallow(<RecipeTile
        {...defaultProps}
        recipe={null}
      />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given undefined recipe', () => {
    test('should return null', () => {
      wrapper = shallow(<RecipeTile
        {...defaultProps}
        recipe={undefined}
      />)

      expect(wrapper.getElement()).toBe(null)
    })
  })

  describe('when given a recipe', () => {
    global.innerWidth = 1200
    beforeEach(() => {
      wrapper = shallow(<RecipeTile
        {...defaultProps}
      />)
    })

    test('should contain a Title', () => {
      expect(wrapper.find(Title)).toHaveLength(1)
    })

    describe('when a recipe is in stock', () => {
      test('should return a <div>', () => {
        expect(wrapper.type()).toBe('div')
      })

      test('should contain one TileImageContainer component', () => {
        expect(wrapper.find(TileImageContainer)).toHaveLength(1)
      })

      test('should contain one RecipeTag component', () => {
        expect(wrapper.find(RecipeTag)).toHaveLength(1)
      })

      test('should contain one RecipeTagTitle component', () => {
        expect(wrapper.find(RecipeTagTitle)).toHaveLength(1)
      })
      test('should contain an RecipeTilePurchaseInfoContainer ', () => {
        expect(wrapper.find(RecipeTilePurchaseInfoContainer)).toHaveLength(1)
      })
    })

    describe('when a recipe is not in stock', () => {
      beforeEach(() => {
        wrapper = shallow(<RecipeTile
          {...defaultProps}
          isOutOfStock
        />)
      })

      test('should contain one TileImageContainer component', () => {
        expect(wrapper.find(TileImageContainer)).toHaveLength(1)
      })
    })

    describe('when click on recipe Tile', () => {
      test('should call showDetailRecipe function', () => {
        wrapper.simulate('click', {
          stopPropagation: () => { }
        })

        expect(defaultProps.showDetailRecipe).toHaveBeenCalled()
      })
    })

    describe('when isFineDineIn is true', () => {
      beforeEach(() => {
        wrapper = shallow(<RecipeTile
          {...defaultProps}
          isFineDineIn
        />)
      })

      test('should have class of recipeTileIsFineDineIn', () => {
        expect(wrapper.find('.recipeTileIsFineDineIn')).toHaveLength(1)
      })
    })

    describe('when isFineDineIn is false', () => {
      beforeEach(() => {
        wrapper = shallow(<RecipeTile {...defaultProps} />)
      })

      test('should have class of recipeTileIsFineDineIn', () => {
        expect(wrapper.find('.recipeTileIsFineDineIn')).toHaveLength(0)
      })
    })
  })
})
