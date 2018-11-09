import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderRecipe from 'routes/Account/AccountComponents/ProductImage'

describe('ProductImage', () => {
  let sandbox
  let wrapper

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  describe('rendering', () => {
    wrapper = shallow(
			<OrderRecipe src="http://image-url" alt="A recipe title" />,
    )

    test('should render a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render an image and a div', () => {
      expect(wrapper.children('img')).toHaveLength(1)
    })

    test('should render an image with the image url passed', () => {
      expect(wrapper.children('img').prop('src')).toBe('http://image-url')
    })
  })
})
