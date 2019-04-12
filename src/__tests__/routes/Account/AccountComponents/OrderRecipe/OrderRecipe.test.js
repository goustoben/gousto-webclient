import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderRecipe from 'routes/Account/AccountComponents/OrderRecipe'

describe('OrderSideSwipe', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  describe('rendering', () => {
    const wrapper = shallow(
      <OrderRecipe
        recipeImage="http://image-url"
        recipeTitle="A recipe title"
      />,
    )
    const blankRecipeWrapper = shallow(
      <OrderRecipe recipeImage="" recipeTitle="" />,
    )

    test('should render a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render an image and a div', () => {
      expect(wrapper.children('img')).toHaveLength(1)
      expect(wrapper.children('div')).toHaveLength(1)
    })

    test('should render an image with the image url passed', () => {
      expect(wrapper.children('img').prop('src')).toBe('http://image-url')
      expect(wrapper.children('div').text()).toBe('A recipe title')
    })

    test('should render a div instead of an image when no image is passed', () => {
      expect(blankRecipeWrapper.children('div')).toHaveLength(2)
    })
  })
})
