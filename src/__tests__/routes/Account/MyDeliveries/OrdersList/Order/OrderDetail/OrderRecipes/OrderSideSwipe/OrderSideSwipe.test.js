import sinon from 'sinon'

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderSideSwipe from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderRecipes/OrderSideSwipe'
import OrderRecipe from 'routes/Account/AccountComponents/OrderRecipe'

describe('OrderSideSwipe', () => {
  let sandbox
  const recipes = Immutable.fromJS([
    {
      image: 'http://image-url',
      title: 'A recipe title',
    },
    {
      image: 'http://image-url2',
      title: 'A recipe title 2',
    },
  ])
  const moreRecipes = Immutable.fromJS([
    {
      image: 'http://image-url',
      title: 'A recipe title',
    },
    {
      image: 'http://image-url2',
      title: 'A recipe title 2',
    },
    {
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
    let wrapper = shallow(<OrderSideSwipe recipes={recipes} />)
    const wrapperWithMoreRecipes = shallow(
      <OrderSideSwipe recipes={moreRecipes} />,
    )

    test('should render a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 4 <OrderRecipe> no matter how many recipes passed', () => {
      expect(wrapper.children(OrderRecipe)).toHaveLength(4)
      expect(wrapperWithMoreRecipes.children(OrderRecipe)).toHaveLength(4)
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

    test("should render 4 minus number of recipes passed <OrderRecipe> with empty ('') props after the <OrderRecipe> with not empty props", () => {
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

    test('should render no empty recipes if orderState= confimed of dispatched', () => {
      wrapper = shallow(
        <OrderSideSwipe recipes={recipes} orderState="dispatched" />,
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
