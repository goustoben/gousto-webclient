import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import CTAHomepage from 'routes/Home/CTA'
import { shallow, mount } from 'enzyme'
import { Button, Segment } from 'goustouicomponents'

describe('CTA', function() {
  let wrapper
  let onClickSpy
  let width

  beforeEach(function() {
    onClickSpy = sinon.spy()
    width = 100
    wrapper = shallow(<CTAHomepage onClick={onClickSpy} width={width}>click here</CTAHomepage>)
  })

  it('should render a Button and a Segment', function() {
    expect(wrapper.find(Button).length).to.equal(1)
    expect(wrapper.find(Segment).length).to.equal(1)
  })

  it('should put the text into the button', function() {
    expect(wrapper.find(Segment).html().indexOf('click here')).not.to.equal(-1)
  })

  it('should map the onClick prop through to the Segment', function() {
    expect(wrapper.find(Segment).prop('onClick')).to.equal(onClickSpy)
  })

  describe('default props', function() {

    beforeEach(function() {
      wrapper = mount(<CTAHomepage onClick={onClickSpy} width={width}>click here</CTAHomepage>)
    })

    it('should be centered on default', function() {
      expect(wrapper.prop('align')).to.equal('center')
    })

    it('should not be responsive on default', function() {
      expect(wrapper.prop('responsive')).to.be.false
    })
  })
})
