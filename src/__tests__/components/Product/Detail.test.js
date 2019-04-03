import React from 'react'

import { mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import Image from 'Image'
import CloseButton from 'Overlay/CloseButton'
import Details from 'Product/Detail/Detail'
import Attributes from 'Product/Attributes/Attributes'
import Buttons from 'Product/Buttons/Buttons'

describe('Product Detail', function () {
  let onVisibilityChangeSpy
  let props
  let wrapper
  let onAdd

  beforeEach(function () {
    onVisibilityChangeSpy = jest.fn()
    onAdd = jest.fn()

    props = {
      attributes: Immutable.fromJS([{ id: 1 }]),
      isAgeVerificationRequired: false,
      isAvailable: true,
      description: 'This is a product description',
      limitReached: false,
      listPrice: '3.00',
      media: 'test-image.jpg',
      onAdd,
      onVisibilityChange: onVisibilityChangeSpy,
      outOfStock: false,
      productId: 'product-123',
      qty: 0,
      title: 'Product 123 Title',
    }

    wrapper = mount(
      <Details {...props} />
    )
  })

  test('should contain 1 container div', function () {
    expect(wrapper.children().length).toEqual(1)
    expect(wrapper.childAt(0).type()).toEqual('div')
  })

  test('should contain 2 child divs in container div', function () {
    const containerDiv = wrapper.childAt(0)
    expect(containerDiv.children().length).toEqual(2)
  })

  test('should contain 1 Image', function () {
    expect(wrapper.find(Image).length).toEqual(1)
  })

  test('should contain 1 p with description', function () {
    expect(wrapper.text()).toContain('This is a product description')
  })

  test('should contain 1 span with formatted list price', function () {
    expect(wrapper.text()).toContain('£3.00')
  })

  test('should contain 1 Attributes', function () {
    expect(wrapper.find(Attributes).length).toEqual(1)
  })

  test('should contain Attributes with attributes prop passed down', function () {
    expect(wrapper.find(Attributes).props().attributes).toEqual(Immutable.fromJS([{ id: 1 }]))
  })

  test('should contain 1 Buttons', function () {
    expect(wrapper.find(Buttons).length).toEqual(1)
  })

  test('should contain Buttons with all unconsumed props passed down', function () {
    expect(wrapper.find(Buttons).props().isAgeVerificationRequired).toEqual(false)
    expect(wrapper.find(Buttons).props().onAdd).toEqual(onAdd)
    expect(wrapper.find(Buttons).props().title).toEqual(undefined)
  })

  test('should pass function which calls onVisibilityChange as onClose to OverlayHeader', function () {
    wrapper.find(CloseButton).prop('onClose')()
    expect(onVisibilityChangeSpy.mock.calls.length).toEqual(1)
  })
})

describe('Product Details Close Overlay', function () {
  let onVisibilityChangeSpy
  let props
  let wrapper

  beforeEach(function () {
    onVisibilityChangeSpy = jest.fn()
    props = {
      attributes: Immutable.fromJS([{ id: 1 }]),
      isAgeVerificationRequired: false,
      isAvailable: true,
      description: 'This is a product description',
      limitReached: false,
      listPrice: '3.00',
      media: 'test-image.jpg',
      onVisibilityChange: onVisibilityChangeSpy,
      outOfStock: false,
      productId: 'product-123',
      qty: 0,
      title: 'Product 123 Title',
    }
    wrapper = mount(
      <Details {...props} />
    )
  })

  test('should call onVisibilityChange on container click', function () {
    wrapper.simulate('click')
    expect(onVisibilityChangeSpy.mock.calls.length).toEqual(1)
  })

  test('should NOT call onVisibilityChange on any click on the detail container itself', function () {
    wrapper.find('ModalTitle').simulate('click')
    expect(onVisibilityChangeSpy).not.toHaveBeenCalled()
  })
})
