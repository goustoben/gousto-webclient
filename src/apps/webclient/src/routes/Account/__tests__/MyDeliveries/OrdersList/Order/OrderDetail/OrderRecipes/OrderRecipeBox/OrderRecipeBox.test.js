import sinon from 'sinon'

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderRecipeBox from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderRecipes/OrderRecipeBox'
import OrderRecipe from 'routes/Account/AccountComponents/OrderRecipe'

describe('OrderRecipeBox', () => {
  let sandbox
  const recipes = Immutable.fromJS([
    {
      id: '001',
      image: 'http://image-url',
      title: 'A recipe title',
    },
    {
      id: '002',
      image: 'http://image-url2',
      title: 'A recipe title 2',
    },
  ])
  const moreRecipes = Immutable.fromJS([
    {
      id: '003',
      image: 'http://image-url',
      title: 'A recipe title',
    },
    {
      id: '004',
      image: 'http://image-url2',
      title: 'A recipe title 2',
    },
    {
      id: '005',
      image: 'http://image-url3',
      title: 'A recipe title 3',
    },
  ])

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  describe('rendering', () => {
    let wrapper = shallow(<OrderRecipeBox recipes={recipes} maxNumRecipes={4} />)
    const eligibleFor5RecipesWrapper = shallow(<OrderRecipeBox recipes={recipes} maxNumRecipes={5} />)
    const wrapperWithMoreRecipes = shallow(
      <OrderRecipeBox recipes={moreRecipes} maxNumRecipes={4} />,
    )

    test('should render a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    describe('when the user is not eligible for 5 recipes', () => {
      test('should render 4 <OrderRecipe> no matter how many recipes passed', () => {
        expect(wrapper.children(OrderRecipe)).toHaveLength(4)
        expect(wrapperWithMoreRecipes.children(OrderRecipe)).toHaveLength(4)
      })

      test('should render 2 <OrderRecipe> with empty props after the 2 <OrderRecipe> with not empty props when passed 2 recipes', () => {
        expect(
          wrapper
            .children(OrderRecipe)
            .at(2)
            .prop('recipeTitle'),
        ).toBe('')
        expect(
          wrapper
            .children(OrderRecipe)
            .at(2)
            .prop('recipeImage'),
        ).toBe('')
        expect(
          wrapper
            .children(OrderRecipe)
            .at(3)
            .prop('recipeTitle'),
        ).toBe('')
        expect(
          wrapper
            .children(OrderRecipe)
            .at(3)
            .prop('recipeImage'),
        ).toBe('')
      })
    })

    describe('when the user is eligible for 5 recipes', () => {
      test('should render 5 <OrderRecipe> no matter how many recipes passed', () => {
        expect(eligibleFor5RecipesWrapper.children(OrderRecipe)).toHaveLength(5)
      })

      test('should render 3 <OrderRecipe> with empty props after the 2 <OrderRecipe> with not empty props when passed 2 recipes', () => {
        expect(
          eligibleFor5RecipesWrapper
            .children(OrderRecipe)
            .at(2)
            .prop('recipeTitle'),
        ).toBe('')
        expect(
          eligibleFor5RecipesWrapper
            .children(OrderRecipe)
            .at(2)
            .prop('recipeImage'),
        ).toBe('')
        expect(
          eligibleFor5RecipesWrapper
            .children(OrderRecipe)
            .at(3)
            .prop('recipeTitle'),
        ).toBe('')
        expect(
          eligibleFor5RecipesWrapper
            .children(OrderRecipe)
            .at(3)
            .prop('recipeImage'),
        ).toBe('')
        expect(
          eligibleFor5RecipesWrapper
            .children(OrderRecipe)
            .at(4)
            .prop('recipeTitle'),
        ).toBe('')
        expect(
          eligibleFor5RecipesWrapper
            .children(OrderRecipe)
            .at(4)
            .prop('recipeImage'),
        ).toBe('')
      })
    })

    test('should render as many <OrderRecipe> with corresponding props as recipes passed', () => {
      expect(
        wrapper
          .children(OrderRecipe)
          .at(0)
          .prop('recipeTitle'),
      ).toBe('A recipe title')
      expect(
        wrapper
          .children(OrderRecipe)
          .at(0)
          .prop('recipeImage'),
      ).toBe('http://image-url')
      expect(
        wrapper
          .children(OrderRecipe)
          .at(1)
          .prop('recipeTitle'),
      ).toBe('A recipe title 2')
      expect(
        wrapper
          .children(OrderRecipe)
          .at(1)
          .prop('recipeImage'),
      ).toBe('http://image-url2')
    })

    test('should render no empty recipes if orderState is confirmed or dispatched', () => {
      wrapper = shallow(
        <OrderRecipeBox recipes={recipes} orderState="dispatched" />,
      )
      expect(
        wrapper
          .children(OrderRecipe)
          .at(0)
          .prop('recipeImage'),
      ).toBe('http://image-url')
      expect(
        wrapper
          .children(OrderRecipe)
          .at(1)
          .prop('recipeTitle'),
      ).toBe('A recipe title 2')
      expect(
        wrapper
          .children(OrderRecipe)
          .at(2)
          .exists()
      ).toBe(false)
      expect(
        wrapper
          .children(OrderRecipe)
          .at(3)
          .exists()
      ).toBe(false)
    })
  })
})
