import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import OverlayHeader from 'Overlay/Header'
import Image from 'Image'
import Details from 'Product/Detail/Detail'
import Attributes from 'Product/Attributes/Attributes'
import Buttons from 'Product/Buttons/Buttons'

describe('Product Detail', function() {
  let onVisibilityChangeSpy
  let props
  let wrapper
  let onAdd

  beforeEach(function() {
    onVisibilityChangeSpy = sinon.stub()
    onAdd = function() {}

    props = {
      attributes: Immutable.fromJS([{ id: 1 }]),
      description: 'This is a product description',
      listPrice: '3.00',
      media: 'test-image.jpg',
      onAdd,
      onVisibilityChange: onVisibilityChangeSpy,
      productId: 'product-123',
      title: 'Product 123 Title',
      testProp: 2,
    }

    wrapper = shallow(
			<Details {...props} />
    )
  })

  it('should return div', function() {
    expect(wrapper.type()).to.equal('div')
  })

  it('should contain 1 container div', function() {
    expect(wrapper.children().length).to.equal(1)
    expect(wrapper.childAt(0).type()).to.equal('div')
  })

  it('should contain 2 child divs in container div', function() {
    const containerDiv = wrapper.childAt(0)
    expect(containerDiv.children().length).to.equal(2)
  })

  it('should contain 1 OverlayHeader', function() {
    expect(wrapper.find(OverlayHeader).length).to.equal(1)
  })

  it('should contain 1 Image', function() {
    expect(wrapper.find(Image).length).to.deep.equal(1)
  })

  it('should contain 1 p with description', function() {
    expect(wrapper.contains(<p>This is a product description</p>)).to.equal(true)
  })

  it('should contain 1 p with formatted list price', function() {
    expect(wrapper.contains(<p>£3.00</p>)).to.equal(true)
  })

  it('should contain 1 Attributes', function() {
    expect(wrapper.find(Attributes).length).to.deep.equal(1)
  })

  it('should contain Attributes with attributes prop passed down', function() {
    expect(wrapper.find(Attributes).props().attributes).to.deep.equal(Immutable.fromJS([{ id: 1 }]))
  })

  it('should contain 1 Buttons', function() {
    expect(wrapper.find(Buttons).length).to.deep.equal(1)
  })

  it('should contain Buttons with all unconsumed props passed down', function() {
    expect(wrapper.find(Buttons).props().testProp).to.deep.equal(2)
    expect(wrapper.find(Buttons).props().onAdd).to.deep.equal(onAdd)
    expect(wrapper.find(Buttons).props().title).to.deep.equal(undefined)
  })

  it('should pass function which calls onVisibilityChange as onClose to OverlayHeader', function() {
    wrapper.find(OverlayHeader).prop('onClose')()
    expect(onVisibilityChangeSpy.callCount).to.equal(1)
  })
})

describe('Product Details Close Overlay', function() {
  let onVisibilityChangeSpy
  let props
  let wrapper

  beforeEach(function() {
    onVisibilityChangeSpy = sinon.stub()
    props = {
      attributes: Immutable.List(),
      description: 'This is a product description',
      listPrice: '3.00',
      media: 'test-image.jpg',
      onVisibilityChange: onVisibilityChangeSpy,
      productId: 'product-123',
      title: 'Product 123 Title',
    }
    wrapper = shallow(
			<Details {...props} />
    )
  })

  it('should call onVisibilityChange on container click', function() {
    wrapper.simulate('click')
    expect(onVisibilityChangeSpy.callCount).to.equal(1)
  })

  it('should NOT call onVisibilityChange on any click on the detail container itself', function() {
    wrapper.childAt(0).simulate('click', { stopPropagation: function() {} })
    expect(onVisibilityChangeSpy).not.to.have.been.calledOnce
  })
})
